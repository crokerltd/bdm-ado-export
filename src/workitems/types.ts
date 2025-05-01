import { BaseWorkItem } from "./BaseWorkItem";
import { Bug } from "./Bug";
import { Feature } from "./Feature";
import { HybridStory } from "./HybridStory";

export interface WorkItemFactoryIf {
    getByWiql(wiqlWhereClause: string): Promise<WorkItem[]>;
    getById(id: number): Promise<WorkItem | undefined>;
    getById(id: number[]): Promise<WorkItem[]>;
}

export type WorkItem = BaseWorkItem | Feature | HybridStory | Bug;

export interface ADOWorkItem<F extends ADOWorkItemBaseFields = ADOWorkItemBaseFields> {
    id: number;
    url: string;
    relations?: ADOWorkItemRel[];
    fields: F
}

export function isADOWorkItem(x: any): x is ADOWorkItem {
    const result = {
        id: typeof x.id === "number",
        url: typeof x.url === "string",
        relations: x.relations === undefined || Array.isArray(x.relations),
        fields: isADOWorkItemBaseFields(x.fields)
    }
    return Object.values(result).every(x => x)
}

export interface ADOWorkItemBaseFields {
    "System.Title": string,
    "System.AreaPath": string;
    "System.AssignedTo"?: ADOWorkItemUser;
    "System.IterationPath": string;
    "System.WorkItemType": string;
    "System.State": string;
    "System.Reason"?: string;
    "System.Parent"?: number;
    "System.Description"?: string;
    "System.Tags"?: string;
    "Microsoft.VSTS.Common.Priority": number,
    "Microsoft.VSTS.Common.Severity": string
}

export function isADOWorkItemBaseFields(x: any): x is ADOWorkItemBaseFields {
    const result = {
        title: typeof x["System.Title"] === "string",
        areaPath: typeof x["System.AreaPath"] === "string",
        assignedTo: (x["System.AssignedTo"] === undefined || typeof x["System.AssignedTo"].displayName === "string"),
        iterationPath: typeof x["System.IterationPath"] === "string",
        workItemType: typeof x["System.WorkItemType"] === "string",
        state: typeof x["System.State"] === "string",
        reason: (x["System.Reason"] === undefined || typeof x["System.Reason"] === "string"),
        parent: (x["System.Parent"] === undefined || typeof x["System.Parent"] === "number"),
        description: (x["System.Description"] === undefined || typeof x["System.Description"] === "string"),
        priority: (x["Microsoft.VSTS.Common.Priority"] === undefined || typeof x["Microsoft.VSTS.Common.Priority"] === "number"),
        severity: (x["Microsoft.VSTS.Common.Severity"] === undefined || typeof x["Microsoft.VSTS.Common.Severity"] === "string")
    }
    return Object.values(result).every(x => x)
}

export interface ADOWorkItemRel {
    rel: string;
    url: string;
    attributes: {
        isLocked: boolean;
        name: string;
    };
}

export interface ADOWorkItemComment {
    mentions: any[],
    workItemId: number,
    id: number,
    version: number,
    text: string,
    createdBy: ADOWorkItemUser,
    createdDate: any,
    modifiedBy: ADOWorkItemUser,
    modifiedDate: any,
    format: string,
    renderedText: string,
    url: string
}

export interface ADOWorkItemUser {
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

