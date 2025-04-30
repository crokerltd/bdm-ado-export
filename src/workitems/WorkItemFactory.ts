import { AdoWit } from "../ado/AdoWit";
import { BaseWorkItem } from "./BaseWorkItem";
import { Bug, isADOBugWorkItem } from "./Bug";
import { Feature, isADOFeatureWorkItem } from "./Feature";
import { HybridStory } from "./HybridStory";
import { ADOWorkItem, WorkItem, isADOWorkItem } from "./types";
import { Level } from 'level'

export class WorkItemFactory {

    private db = new Level<string, any>('./out/db', { valueEncoding: 'json' });

    private static instance: WorkItemFactory;
    public static getInstance(): WorkItemFactory {
        if (!WorkItemFactory.instance) {
            WorkItemFactory.instance = new WorkItemFactory();
        }
        return WorkItemFactory.instance;
    }

    // protected cache: Map<number, ADOWorkItem> = new Map<number, ADOWorkItem>;

    close(): Promise<void> {
        return this.db.close()
    }

    async getByWiql(wiqlWhereClause: string): Promise<WorkItem[]> {
        const adoWit = AdoWit.getInstance();
        const workItems = await adoWit.adoGetIdsFromWiql(`
        SELECT [System.Id]
        FROM workitems
        WHERE ${wiqlWhereClause}`
        );
        return this.getById(workItems)
    }

    async getById(id: number): Promise<WorkItem | undefined>;
    async getById(id: number[]): Promise<(WorkItem)[]>;
    async getById(id: number | number[]): Promise<WorkItem | undefined | WorkItem[]> {
        if (Array.isArray(id)) {

            const temp: { [key: number]: ADOWorkItem | undefined } = {}

            const cacheResults = await this.db.getMany(id.map(x => `${x}`))
            id.forEach((v, i) => { temp[v] = cacheResults[i] })

            const fetchIds = id.filter((v, i) => cacheResults[i] === undefined) as number[]
            const fetchResults = await this.getByIdFromADO(fetchIds);
            fetchIds.forEach((v, i) => { temp[v] = fetchResults[i] })

            await this.db.batch(fetchIds
                .map((v, i) => {
                    if (fetchResults[i] !== undefined) {
                        return {
                            type: 'put',
                            key: `${v}`,
                            value: fetchResults[i]
                        }
                    }
                })
                .filter(v => v !== undefined) as any);

            return id
                .map(i => temp[i])
                .filter(i => i !== undefined)
                .map(i => this.convert(i)) as WorkItem[];

        } else {
            const strId: string = `${id}`
            var result: ADOWorkItem | undefined = await this.db.get(strId)
            console.log('x', result, 'x')
            if (result === undefined) {
                result = await this.getByIdFromADO(id);
                if (result !== undefined) {
                    await this.db.put(strId, result);
                }
            }
            return this.convert(result);
        }
    }

    /*
    async getByIdFromMemCache(id: number): Promise<WorkItem | undefined>;
    async getByIdFromMemCache(id: number[]): Promise<(WorkItem)[]>;
    async getByIdFromMemCache(id: number | number[]): Promise<WorkItem | undefined | WorkItem[]> {

        if (Array.isArray(id)) {
            const fetchResult = await this.getByIdFromADO(id.filter(i => !this.cache.has(i)));
            for (const i of fetchResult) {
                this.cache.set(i.id, i);
            }
            return id
                .map(i => this.cache.get(i))
                .filter(i => i !== undefined)
                .map(i => this.convert(i)) as WorkItem[];
        } else {
            if (!this.cache.has(id)) {
                const result = await this.getByIdFromADO(id);
                if (result !== undefined) {
                    this.cache.set(id, result);
                }
            }
            const wi = this.cache.get(id);
            return this.convert(wi);
        }
    }
    */

    private async getByIdFromADO(id: number): Promise<ADOWorkItem | undefined>;
    private async getByIdFromADO(id: number[]): Promise<ADOWorkItem[]>;
    private async getByIdFromADO(id: number | number[]): Promise<ADOWorkItem | undefined | ADOWorkItem[]> {
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

}