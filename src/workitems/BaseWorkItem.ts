import { AdoWit } from "../AdoWit";

export interface WorkItemRel {
    rel: string;
    id: number;
    url: string;
    attributes: {
        isLocked: boolean;
        name: string;
    };
}

export interface WorkItemComment {
    mentions: any[],
    workItemId: number,
    id: number,
    version: number,
    text: string,
    createdBy: WorkItemUser,
    createdDate: any,
    modifiedBy: WorkItemUser,
    modifiedDate: any,
    format: string,
    renderedText: string,
    url: string
}

export interface WorkItemUser {
    displayName: string,
    url: string,
    _links: {
        avatar: {
            href: string
        }
    },
    id: string,
    uniqueName: string,
    imageUrl: string,
    descriptor: string
}

const BASE_FIELDS: string[] = [
    'System.Title',
    'System.AreaPath',
    'System.IterationPath',
    'System.WorkItemType',
    'System.State',
    'System.Parent',
    'System.Description',
    'System.Tags'
];

export abstract class BaseWorkItem {

    protected static async getByWiql(wiql: string, fields?: string[]): Promise<any> {
        const adoWit = AdoWit.getInstance();
        const ids = await adoWit.adoGetIdsFromWiql(wiql);
        return await adoWit.getWorkItems(ids, [...BASE_FIELDS, ...(fields || [])]);
    }

    protected static async getById(id: number | number[], fields?: string[]): Promise<any> {
        const adoWit = AdoWit.getInstance();
        const workItems = await adoWit.getWorkItems(
            Array.isArray(id) ? id : [id],
            [...BASE_FIELDS, ...(fields || [])]
        );
        return workItems[0];
    }

    readonly itemFields: string[] = [];

    id: number;
    title: string;
    areaPath: string;
    iterationPath: string;
    workItemType: string;
    state: string;
    parent: string;
    description: string;
    relations: WorkItemRel[];
    url: string;
    tags: string[];
    comments: undefined | WorkItemComment[] = undefined;

    protected get adoWit(): AdoWit {
        if (!this._adoWit) {
            this._adoWit = AdoWit.getInstance();
        }
        return this._adoWit;
    }
    private _adoWit: AdoWit | undefined;

    constructor(
        data: any
    ) {
        this.id = data.id;
        this.title = data.fields["System.Title"];
        this.areaPath = data.fields["System.AreaPath"];
        this.iterationPath = data.fields["System.IterationPath"];
        this.workItemType = data.fields["System.WorkItemType"];
        this.state = data.fields["System.State"];
        this.parent = data.fields["System.Parent"];
        this.description = data.fields["System.Description"];
        this.relations = data.relations;
        this.url = data.url;
        this.tags = (data.fields["System.Tags"] || '').split(";");
    }

    async getChildrenIds() {
        return this.relations
            .filter(r => r.rel === "System.LinkTypes.Hierarchy-Forward")
            .map(r => r.id);
    }

    async getComments(): Promise<WorkItemComment[]> {
        if (this.comments === undefined) {
            this.comments = (await this.adoWit.getWorkItemComments(this.id)).comments;
        }
        return this.comments || [];
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