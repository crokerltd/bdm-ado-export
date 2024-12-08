import { BaseWorkItem } from "./BaseWorkItem";
import { Feature } from "./Feature";
import { HybridStory } from "./HybridStory";

export interface WorkItemFactoryIf {
    getByWiql(wiqlWhereClause: string): Promise<WorkItem[]>;
    getById(id: number): Promise<WorkItem | undefined>;
    getById(id: number[]): Promise<WorkItem[]>;
}

export type WorkItem = BaseWorkItem | Feature | HybridStory;

export interface ADOWorkItem {
    id: number;
    url: string;
    relations: ADOWorkItemRel[];
    fields: {
        "System.Title": string,
        "System.AreaPath": string;
        "System.IterationPath": string;
        "System.WorkItemType": string;
        "System.State": string;
        "System.Parent": string;
        "System.Description": string;
        "System.Tags": string;

        // Feature
        "Custom.FeatureCategory2": string;
        "Custom.Release": string;
        "Custom.PlannedDevSprint_OAS": string;
        "Custom.FeatureSource": string;
        "Microsoft.VSTS.Common.AcceptanceCriteria": string;
        "Custom.Assumptions": string;
    }
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

