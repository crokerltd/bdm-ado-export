import { BaseWorkItem } from "./BaseWorkItem";
import { Bug, isADOBugWorkItem } from "./Bug";
import { Feature, isADOFeatureWorkItem } from "./Feature";
import { ADOWorkItem, ADOWorkItemComment, WorkItem, WorkItemFactoryIf, isADOWorkItem } from "./types";
import { WorkItemCache } from "./WorkItemCache";

export class WorkItemFactory implements WorkItemFactoryIf {

    protected workitemCache: WorkItemCache = WorkItemCache.getInstance()

    constructor(
        public readonly projectId: string
    ) {
        // Do nothing
    }

    async getByWiql(wiqlWhereClause: string): Promise<WorkItem[]> {
        const adoWorkItems = await this.workitemCache.getByWiql(this.projectId, wiqlWhereClause)
        return adoWorkItems.map(i => this.convert(i)) as WorkItem[];
    }

    async getById(id: number): Promise<WorkItem | undefined>;
    async getById(id: number[]): Promise<(WorkItem)[]>;
    async getById(id: number | number[]): Promise<WorkItem | undefined | WorkItem[]> {
        if (Array.isArray(id)) {
            const adoWorkItems = await this.workitemCache.getById(this.projectId, id)
            return adoWorkItems.map(i => this.convert(i)) as WorkItem[];

        } else {
            const adoWorkItem = await this.workitemCache.getById(this.projectId, id)
            return this.convert(adoWorkItem);
        }
    }

    protected convert(data?: ADOWorkItem): WorkItem | undefined {
        if (!data) {
            console.error('Data is undefined')
            return undefined;
        } else if (isADOFeatureWorkItem(data)) {
            return new Feature(data, this);
        } else if (isADOBugWorkItem(data)) {
            return new Bug(data, this);
        } else if (isADOWorkItem(data)) {
            return new BaseWorkItem(data, this);
        } else {
            // Record format has failed
            console.error('Data does not comply with BaseWorkItem')
            return undefined;
        }
    }

    getWorkItemComments(id: number): Promise<ADOWorkItemComment[]> {
        return this.workitemCache.getWorkItemComments(this.projectId, id);
    }

}