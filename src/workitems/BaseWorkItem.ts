import { AdoWit } from "../ado/AdoWit";
import { njk } from "../njk";
import { writeFile } from "../utils";
import { WalkedNode } from "../Walker";
import { ADOWorkItem, ADOWorkItemComment, ADOWorkItemRel, WorkItem, WorkItemFactoryIf } from "./types";

export interface RelatedWorkItem extends ADOWorkItemRel {
    id: number;
    workitem: WorkItem;
}

export class BaseWorkItem implements WalkedNode<BaseWorkItem> {

    id: number;
    title: string;
    areaPath: string;
    iterationPath: string;
    workItemType: string;
    state: string;
    parent?: number;
    description?: string;
    relations: ADOWorkItemRel[];
    url: string;
    tags: string[];
    comments: undefined | ADOWorkItemComment[] = undefined;
    priority?: number;
    severity?: string;

    protected get adoWit(): AdoWit {
        if (!this._adoWit) {
            this._adoWit = AdoWit.getInstance();
        }
        return this._adoWit;
    }
    private _adoWit: AdoWit | undefined;

    constructor(
        public readonly data: ADOWorkItem,
        public readonly factory: WorkItemFactoryIf
    ) {
        this.id = data.id;
        this.title = data.fields["System.Title"];
        this.areaPath = data.fields["System.AreaPath"];
        this.iterationPath = data.fields["System.IterationPath"];
        this.workItemType = data.fields["System.WorkItemType"];
        this.state = data.fields["System.State"];
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
            this.comments = (await this.adoWit.getWorkItemComments(this.id)).comments;
        }
        return this.comments || [];
    }

    getRelatedNodes(): Promise<WalkedNode<BaseWorkItem>[]> {
        return Promise.resolve([]);
    }

    async processNode(): Promise<void> {
        await this.getComments();
        await writeFile(await this.render(), `workitems/${this.id}.html`);
        // await writeFile(JSON.stringify(feature), `out/feature-${feature.id}.json`);
    }

    async getRelatedWorkItems(filterFn?: (x: ADOWorkItemRel & { id: number }) => boolean): Promise<RelatedWorkItem[]> {
        const rels = this.getRelatedWorkItemRecords().filter(filterFn || (() => true));
        return (await this.factory.getById(rels.map(rel => rel.id)))
            .map(workitem => ({
                ...rels.find(r => r.id === workitem?.id) as ADOWorkItemRel & { id: number },
                workitem
            }));
    }

    async render(template = 'workitem.njk', data: object = {}): Promise<string> {
        const combinedData = {
            item: this,
            related: await this.getRelatedWorkItems(),
            comments: await this.getComments(),
            ...data
        };
        return await njk(template, combinedData);
    }

    /*
    async getTags(): Promise<WorkItemComment[]> {
        if (this.tags === undefined) {
            this.comments = (await this.adoWit.getTags(this.id));
        }
        return this.comments || [];
    }
    */

}


// https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/329386