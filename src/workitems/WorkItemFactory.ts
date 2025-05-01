import { AdoWit } from "../ado/AdoWit";
import { BaseWorkItem } from "./BaseWorkItem";
import { Bug, isADOBugWorkItem } from "./Bug";
import { Feature, isADOFeatureWorkItem } from "./Feature";
import { HybridStory } from "./HybridStory";
import { ADOWorkItem, ADOWorkItemComment, WorkItem, WorkItemFactoryIf, isADOWorkItem } from "./types";
import { Level } from 'level'
import { createHash } from "crypto";

export class WorkItemFactory implements WorkItemFactoryIf {

    public static useCache = {
        wiql: false,
        workitems: false,
        comments: false
    };

    private static instance: WorkItemFactory;
    public static getInstance(): WorkItemFactory {
        if (!WorkItemFactory.instance) {
            WorkItemFactory.instance = new WorkItemFactory();
        }
        return WorkItemFactory.instance;
    }

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

    async getByWiql(wiqlWhereClause: string): Promise<WorkItem[]> {
        const ids = await this.getIdsFromWiqlFromLocal(wiqlWhereClause)
        return this.getById(ids);
    }

    private async getIdsFromWiqlFromLocal(wiqlWhereClause: string): Promise<number[]> {
        const key = createHash('md5').update(wiqlWhereClause).digest('hex')
        var result: number[] | undefined = (WorkItemFactory.useCache.wiql) ? await this.db.get(`wiqi-${key}`) : undefined;
        if (result === undefined) {
            result = await this.getIdsFromWiqlFromADO(wiqlWhereClause)
            await this.db.put(`wiqi-${key}`, result);
        }
        return result;
    }

    private async getIdsFromWiqlFromADO(wiqlWhereClause: string): Promise<number[]> {
        console.log('fetching wiql from ADO:', wiqlWhereClause)
        const adoWit = AdoWit.getInstance();
        return adoWit.adoGetIdsFromWiql(`
        SELECT [System.Id]
        FROM workitems
        WHERE ${wiqlWhereClause}`
        );
    }

    async getById(id: number): Promise<WorkItem | undefined>;
    async getById(id: number[]): Promise<(WorkItem)[]>;
    async getById(id: number | number[]): Promise<WorkItem | undefined | WorkItem[]> {
        if (Array.isArray(id)) {
            if (id.length === 0) {
                return [];
            }
            const fetchResult = await this.getByIdFromLocal(id.filter(i => !this.workitemCache.has(i)));
            for (const i of fetchResult.filter(i => i !== undefined)) {
                this.workitemCache.set(i.id, i);
            }
            return id
                .map(i => this.workitemCache.get(i))
                .filter(i => i !== undefined)
                .map(i => this.convert(i)) as WorkItem[];

        } else {
            if (!this.workitemCache.has(id)) {
                const result = await this.getByIdFromLocal(id);
                if (result !== undefined) {
                    this.workitemCache.set(id, result);
                }
            }
            const wi = this.workitemCache.get(id);

            return this.convert(wi);
        }
    }

    private async getByIdFromLocal(id: number): Promise<ADOWorkItem | undefined>;
    private async getByIdFromLocal(id: number[]): Promise<(ADOWorkItem)[]>;
    private async getByIdFromLocal(id: number | number[]): Promise<ADOWorkItem | undefined | ADOWorkItem[]> {
        if (Array.isArray(id)) {

            const temp: { [key: number]: ADOWorkItem | undefined } = {}

            var cacheResults: (ADOWorkItem | undefined)[] = [];
            if (WorkItemFactory.useCache.workitems) {
                cacheResults = await this.db.getMany(id.map(x => `workitem-${x}`))
                id.forEach((v, i) => { temp[v] = cacheResults[i] })
            } else {
                cacheResults = id.map(i => undefined)
            }

            const fetchIds = id.filter((v, i) => cacheResults[i] === undefined) as number[]
            const fetchResults = await this.getByIdFromADO(fetchIds);
            fetchIds.forEach((v, i) => { temp[v] = fetchResults[i] })

            await this.db.batch(fetchIds
                .map((v, i) => {
                    if (fetchResults[i] !== undefined) {
                        return {
                            type: 'put',
                            key: `workitem-${v}`,
                            value: fetchResults[i]
                        }
                    }
                })
                .filter(v => v !== undefined) as any);

            return id
                .map(i => temp[i])
                .filter(i => i !== undefined) as ADOWorkItem[];
        } else {
            const strId: string = `workitem-${id}`
            var result: ADOWorkItem | undefined = (WorkItemFactory.useCache.workitems) ? await this.db.get(strId) : undefined;
            if (result === undefined) {
                result = await this.getByIdFromADO(id);
                if (result !== undefined) {
                    await this.db.put(strId, result);
                }
            }
        }
    }

    private async getByIdFromADO(id: number): Promise<ADOWorkItem | undefined>;
    private async getByIdFromADO(id: number[]): Promise<ADOWorkItem[]>;
    private async getByIdFromADO(id: number | number[]): Promise<ADOWorkItem | undefined | ADOWorkItem[]> {
        if (Array.isArray(id) && id.length === 0) {
            return [];
        }
        console.log('fetching workitems from ADO:', id)
        const adoWit = AdoWit.getInstance();
        const workItems = await adoWit.getWorkItems(
            Array.isArray(id) ? id : [id]
            // , this.fields
        );
        if (Array.isArray(id)) {
            return workItems.filter((i: any) => i !== undefined) as ADOWorkItem[];
        } else {
            return workItems[0]
        }
    }

    private convert(data?: ADOWorkItem): WorkItem | undefined {
        if (!data) {
            return undefined;
        } else {
            switch (data.fields['System.WorkItemType']) {
                case 'Feature':
                    if (isADOFeatureWorkItem(data)) {
                        return new Feature(data, this);
                    }
                    break;
                case 'Hybrid Story':
                    return new HybridStory(data, this);
                case 'Bug':
                    if (isADOBugWorkItem(data)) {
                        return new Bug(data, this);
                    }
                    break;
                default:
                    if (isADOWorkItem(data)) {
                        return new BaseWorkItem(data, this);
                    }
            }
            // Record format has failed
            console.error('Data does not comply with BaseWorkItem', data.fields['System.WorkItemType'])
            return undefined;
        }
    }

    async getWorkItemComments(id: number): Promise<ADOWorkItemComment[]> {
        var result = this.commentCache.get(id);
        if (result === undefined) {
            result = await this.getWorkItemCommentsFromLocal(id);
            this.commentCache.set(id, result);
        }
        return result;
    }

    private async getWorkItemCommentsFromLocal(id: number): Promise<ADOWorkItemComment[]> {
        const strId: string = `comments-${id}`
        var result: ADOWorkItemComment[] | undefined = (WorkItemFactory.useCache.comments) ? await this.db.get(strId) : undefined;
        if (result === undefined) {
            result = await this.getWorkItemCommentsFromADO(id);
            if (result !== undefined) {
                await this.db.put(strId, result);
            }
        }
        return result;
    }

    private async getWorkItemCommentsFromADO(id: number): Promise<ADOWorkItemComment[]> {
        console.log('fetching comments from ADO:', id)
        const adoWit = AdoWit.getInstance();
        return (await adoWit.getWorkItemComments(id)).comments || [];
    }

}