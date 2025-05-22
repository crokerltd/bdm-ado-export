import { njk } from "../../utils/njk";
import { writeFile } from "../../utils/utils";
import { WalkedNode } from "./Walker";
import { ADOWorkItem, ADOWorkItemComment, ADOWorkItemRel, WorkItem, WorkItemFactoryIf } from "./types";

export interface RelatedWorkItem extends ADOWorkItemRel {
    id: number;
    workitem: WorkItem;
}

export interface User {
    displayName: string;
}

export class BaseWorkItem implements WalkedNode<BaseWorkItem> {

    id: number;
    title: string;
    areaPath: string;
    assignedTo?: User;
    iterationPath: string;
    workItemType: string;
    state: string;
    reason?: string;
    parent?: number;
    description?: string;
    relations: ADOWorkItemRel[];
    url: string;
    tags: string[];
    priority?: number;
    severity?: string;

    comments: undefined | ADOWorkItemComment[] = undefined;
    related: undefined | RelatedWorkItem[] = undefined;

    constructor(
        public readonly data: ADOWorkItem,
        public readonly factory: WorkItemFactoryIf,
        public readonly leafNode: boolean = false,
    ) {
        this.id = data.id;
        this.title = data.fields["System.Title"];
        this.areaPath = data.fields["System.AreaPath"];
        this.assignedTo = data.fields["System.AssignedTo"];
        this.iterationPath = data.fields["System.IterationPath"];
        this.workItemType = data.fields["System.WorkItemType"];
        this.state = data.fields["System.State"];
        this.reason = data.fields["System.Reason"];
        this.parent = data.fields["System.Parent"];
        this.description = data.fields["System.Description"];
        this.relations = data.relations || [];
        this.url = data.url;
        this.tags = (data.fields["System.Tags"] || '').split(";");
        this.priority = data.fields["Microsoft.VSTS.Common.Priority"];
        this.severity = data.fields["Microsoft.VSTS.Common.Severity"];
    }

    get severityNum(): number | undefined {
        return (this.severity === undefined) ? undefined : parseInt(this.severity.substring(0, 1))
    }

    getRelatedWorkItemRecords(): (ADOWorkItemRel & { id: number })[] {
        return this.relations
            .map(rel => ({ ...rel, id: parseInt(rel.url.split('workItems/')[1]) }) as ADOWorkItemRel & { id: number })
            .filter(rel => !isNaN(rel.id));
    }

    getChildrenIds() {
        return this.getRelatedWorkItemRecords()
            .filter(r => r.rel === "System.LinkTypes.Hierarchy-Forward")
            .map(r => r.id);
    }

    async getComments(): Promise<ADOWorkItemComment[]> {
        if (this.comments === undefined) {
            this.comments = await this.factory.getWorkItemComments(this.id);
        }
        return this.comments || [];
    }

    getRelatedNodes(): Promise<WalkedNode<BaseWorkItem>[]> {
        return Promise.resolve([]);
    }

    async processNode(): Promise<void> {
        await this.getComments();
        await this.getRelatedWorkItems();
        await writeFile(await this.render(), `workitems/${this.id}.html`);
        await writeFile(JSON.stringify(this.data), `workitems/${this.id}.json`);
    }

    async getRelatedWorkItems(): Promise<RelatedWorkItem[]> {
        if (this.related === undefined) {
            if (!this.leafNode) {
                const rels = this.getRelatedWorkItemRecords();
                this.related = (await this.factory.getById(rels.map(rel => rel.id)))
                    .map(workitem => ({
                        ...rels.find(r => r.id === workitem?.id) as ADOWorkItemRel & { id: number },
                        workitem
                    }));
            } else {
                this.related = [];
            }
        }
        return this.related;
    }

    async render(template = 'workitem.njk', data: object = {}): Promise<string> {
        const combinedData = {
            item: this,
            ...data
        };
        return await njk(template, combinedData);
    }

}


// https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/329386