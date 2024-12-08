import { AdoWit } from "../ado/AdoWit";
import { BaseWorkItem } from "./BaseWorkItem";
import { Feature } from "./Feature";
import { HybridStory } from "./HybridStory";
import { ADOWorkItem, WorkItem } from "./types";

export const BASE_FIELDS: string[] = [
    'System.Title',
    'System.AreaPath',
    'System.IterationPath',
    'System.WorkItemType',
    'System.State',
    'System.Parent',
    'System.Description',
    'System.Tags',

    // Feature
    'Custom.FeatureCategory2',
    'Custom.Release',
    'Custom.PlannedDevSprint_OAS',
    'Custom.FeatureSource',
    'Microsoft.VSTS.Common.AcceptanceCriteria',
    'Custom.Assumptions'
];

export class WorkItemFactory {

    private static instance: WorkItemFactory;
    public static getInstance(): WorkItemFactory {
        if (!WorkItemFactory.instance) {
            WorkItemFactory.instance = new WorkItemFactory();
        }
        return WorkItemFactory.instance;
    }

    protected cache: Map<number, ADOWorkItem> = new Map<number, ADOWorkItem>;

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
                    return new Feature(data, this);
                case 'Hybrid Story':
                    return new HybridStory(data, this);
                default:
                    return new BaseWorkItem(data, this);
            }
        }
    }

}