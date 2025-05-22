import { BaseWorkItem } from "./BaseWorkItem";
import { ADOWorkItem, ADOWorkItemBaseFields, WorkItemFactoryIf, isADOWorkItem } from "./types";

export function isADOFeatureWorkItem(x: any): x is ADOWorkItem<ADOWorkItemFeatureFields> {
    return isADOWorkItem(x) && x.fields["System.WorkItemType"] === "Feature" && isADOWorkItemFeatureFields(x.fields)
}

export interface ADOWorkItemFeatureFields extends ADOWorkItemBaseFields {
    "Microsoft.VSTS.Common.AcceptanceCriteria"?: string;
}

export function isADOWorkItemFeatureFields(x: any): x is ADOWorkItemFeatureFields {
    const result = {
        acceptanceCriteria: (x["Microsoft.VSTS.Common.AcceptanceCriteria"] === undefined || typeof x["Microsoft.VSTS.Common.AcceptanceCriteria"] === "string"),
    }
    return Object.values(result).every(x => x)
}

export class Feature extends BaseWorkItem {

    acceptanceCriteria?: string;

    constructor(data: ADOWorkItem<ADOWorkItemFeatureFields>, factory: WorkItemFactoryIf, leafNode?: boolean) {
        super(data, factory, leafNode);
        this.acceptanceCriteria = data.fields["Microsoft.VSTS.Common.AcceptanceCriteria"];
    }

}
