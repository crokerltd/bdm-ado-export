import { AdoWit } from "../../ado/AdoWit";
import { ADOWorkItem, ADOWorkItemComment } from "./types";
import { Level } from 'level'
import { createHash } from "crypto";

export class WorkItemCache {

    private static instance: WorkItemCache;
    public static getInstance(): WorkItemCache {
        if (!WorkItemCache.instance) {
            WorkItemCache.instance = new WorkItemCache();
        }
        return WorkItemCache.instance;
    }

    public useCache = {
        wiql: false,
        workitems: false,
        comments: false,
        write: true
    };

    protected workitemCache: Map<number, ADOWorkItem> = new Map<number, ADOWorkItem>;
    protected commentCache: Map<number, ADOWorkItemComment[]> = new Map<number, ADOWorkItemComment[]>;

    private get db(): Level<string, any> {
        if (this._db === undefined) {
            this._db = new Level<string, any>(__dirname + '/../../db', { valueEncoding: 'json' });
        }
        return this._db;
    }
    private _db: Level<string, any> | undefined;

    close(): Promise<void> {
        if (this._db !== undefined) {
            return this._db.close()
        } else {
            return Promise.resolve()
        }
    }

    async getByWiql(projectId: string, wiqlWhereClause: string): Promise<ADOWorkItem[]> {
        const ids = await this.getIdsFromWiqlFromLocal(projectId, wiqlWhereClause)
        return this.getById(projectId, ids);
    }

    private async getIdsFromWiqlFromLocal(projectId: string, wiqlWhereClause: string): Promise<number[]> {
        const key = createHash('md5').update(wiqlWhereClause).digest('hex')
        var result: number[] | undefined = (this.useCache.wiql) ? await this.db.get(`wiqi-${projectId}-${key}`) : undefined;
        if (result === undefined) {
            result = await this.getIdsFromWiqlFromADO(projectId, wiqlWhereClause)
            if (this.useCache.write) {
                await this.db.put(`wiqi-${projectId}-${key}`, result);
            }
        }
        return result;
    }

    private async getIdsFromWiqlFromADO(projectId: string, wiqlWhereClause: string): Promise<number[]> {
        console.log('fetching wiql from ADO:', wiqlWhereClause)
        const adoWit = AdoWit.getInstance();
        return adoWit.adoGetIdsFromWiql(projectId, `
        SELECT [System.Id]
        FROM workitems
        WHERE ${wiqlWhereClause}`
        );
    }

    async getById(projectId: string,id: number): Promise<ADOWorkItem | undefined>;
    async getById(projectId: string,id: number[]): Promise<(ADOWorkItem)[]>;
    async getById(projectId: string,id: number | number[]): Promise<ADOWorkItem | undefined | ADOWorkItem[]> {
        if (Array.isArray(id)) {
            if (id.length === 0) {
                return [];
            }
            const fetchResult = await this.getByIdFromLocal(projectId, id.filter(i => !this.workitemCache.has(i)));
            for (const i of fetchResult.filter(i => i !== undefined)) {
                this.workitemCache.set(i.id, i);
            }
            return id
                .map(i => this.workitemCache.get(i))
                .filter(i => i !== undefined) as ADOWorkItem[];

        } else {
            if (!this.workitemCache.has(id)) {
                const result = await this.getByIdFromLocal(projectId, id);
                if (result !== undefined) {
                    this.workitemCache.set(id, result);
                }
            }
            return this.workitemCache.get(id);
        }
    }

    private async getByIdFromLocal(projectId: string,id: number): Promise<ADOWorkItem | undefined>;
    private async getByIdFromLocal(projectId: string,id: number[]): Promise<(ADOWorkItem)[]>;
    private async getByIdFromLocal(projectId: string,id: number | number[]): Promise<ADOWorkItem | undefined | ADOWorkItem[]> {
        if (Array.isArray(id)) {

            const temp: { [key: number]: ADOWorkItem | undefined } = {}

            var cacheResults: (ADOWorkItem | undefined)[] = [];
            if (this.useCache.workitems) {
                cacheResults = await this.db.getMany(id.map(x => `wi-${projectId}-${x}`))
                id.forEach((v, i) => { temp[v] = cacheResults[i] })
            } else {
                cacheResults = id.map(i => undefined)
            }

            const fetchIds = id.filter((v, i) => cacheResults[i] === undefined) as number[]
            const fetchResults = await this.getByIdFromADO(projectId, fetchIds);
            fetchIds.forEach((v, i) => { temp[v] = fetchResults[i] })

            if (this.useCache.write) {
                await this.db.batch(fetchIds
                    .map((v, i) => {
                        if (fetchResults[i] !== undefined) {
                            return {
                                type: 'put',
                                key: `wi-${projectId}-${v}`,
                                value: fetchResults[i]
                            }
                        }
                    })
                    .filter(v => v !== undefined) as any);
            }

            return id
                .map(i => temp[i])
                .filter(i => i !== undefined) as ADOWorkItem[];
        } else {
            const strId: string = `wi-${projectId}-${id}`
            var result: ADOWorkItem | undefined = (this.useCache.workitems) ? await this.db.get(strId) : undefined;
            if (result === undefined) {
                result = await this.getByIdFromADO(projectId, id);
                if (result !== undefined && this.useCache.write) {
                    await this.db.put(strId, result);
                }
            }
        }
    }

    private async getByIdFromADO(projectId: string, id: number): Promise<ADOWorkItem | undefined>;
    private async getByIdFromADO(projectId: string, id: number[]): Promise<ADOWorkItem[]>;
    private async getByIdFromADO(projectId: string, id: number | number[]): Promise<ADOWorkItem | undefined | ADOWorkItem[]> {
        if (Array.isArray(id) && id.length === 0) {
            return [];
        }
        console.log('fetching workitems from ADO:', id)
        const adoWit = AdoWit.getInstance();
        const workItems = await adoWit.getWorkItems(
            projectId,
            Array.isArray(id) ? id : [id]
            // , this.fields
        );
        if (Array.isArray(id)) {
            return workItems.filter((i: any) => i !== undefined) as ADOWorkItem[];
        } else {
            return workItems[0]
        }
    }

    async getWorkItemComments(projectId: string, id: number): Promise<ADOWorkItemComment[]> {
        var result = this.commentCache.get(id);
        if (result === undefined) {
            result = await this.getWorkItemCommentsFromLocal(projectId, id);
            this.commentCache.set(id, result);
        }
        return result;
    }

    private async getWorkItemCommentsFromLocal(projectId: string, id: number): Promise<ADOWorkItemComment[]> {
        const strId: string = `wic-${projectId}-${id}`
        var result: ADOWorkItemComment[] | undefined = (this.useCache.comments) ? await this.db.get(strId) : undefined;
        if (result === undefined) {
            result = await this.getWorkItemCommentsFromADO(projectId, id);
            if (result !== undefined && this.useCache.write) {
                await this.db.put(strId, result);
            }
        }
        return result;
    }

    private async getWorkItemCommentsFromADO(projectId: string, id: number): Promise<ADOWorkItemComment[]> {
        console.log('fetching comments from ADO:', id)
        const adoWit = AdoWit.getInstance();
        return (await adoWit.getWorkItemComments(projectId, id)).comments || [];
    }

}