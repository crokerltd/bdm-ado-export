import { WalkedNode } from "../ado/Walker";
import { BaseWorkItem } from "../ado/BaseWorkItem";
import { ADOWorkItem, WorkItemFactoryIf, isADOWorkItem } from "../ado/types";
import { ADOWorkItemFeatureFields, Feature, isADOFeatureWorkItem } from "../ado/Feature";

export function isOASFeatureWorkItem(x: any): x is ADOWorkItem<OASWorkItemFeatureFields> {
    return isADOWorkItem(x) && x.fields["System.WorkItemType"] === "Feature" && isADOFeatureWorkItem(x) && isOASWorkItemFeatureFields(x.fields)
}

export interface OASWorkItemFeatureFields extends ADOWorkItemFeatureFields {
    "Custom.FeatureCategory2"?: string;
    "Custom.Release"?: string;
    "Custom.PlannedDevSprint_OAS"?: string;
    "Custom.FeatureSource"?: string;
    "Custom.Assumptions"?: string;
}

export function isOASWorkItemFeatureFields(x: any): x is OASWorkItemFeatureFields {
    const result = {
        category: (x["Custom.FeatureCategory2"] === undefined || typeof x["Custom.FeatureCategory2"] === "string"),
        release: (x["Custom.Release"] === undefined || typeof x["Custom.Release"] === "string"),
        plannedSprint: (x["Custom.PlannedDevSprint_OAS"] === undefined || typeof x["Custom.PlannedDevSprint_OAS"] === "string"),
        featureSource: (x["Custom.FeatureSource"] === undefined || typeof x["Custom.FeatureSource"] === "string"),
        assumptions: (x["Custom.Assumptions"] === undefined || typeof x["Custom.Assumptions"] === "string")
    }
    return Object.values(result).every(x => x)
}

export class OASFeature extends Feature {

    featureCategory?: string;
    release?: string;
    plannedDevSprintOAS?: string;
    featureSource?: string;
    assumptions?: string;

    constructor(data: ADOWorkItem<OASWorkItemFeatureFields>, factory: WorkItemFactoryIf, leafNode?: boolean) {
        super(data, factory, leafNode);
        this.featureCategory = data.fields["Custom.FeatureCategory2"];
        this.release = data.fields["Custom.Release"];
        this.plannedDevSprintOAS = data.fields["Custom.PlannedDevSprint_OAS"];
        this.featureSource = data.fields["Custom.FeatureSource"];
        this.assumptions = data.fields["Custom.Assumptions"];
    }

    async getRelatedNodes(): Promise<WalkedNode<BaseWorkItem>[]> {
        return this.factory.getByWiql(`[System.WorkItemType] == "Hybrid Story" AND [System.Parent] = ${this.id}`);
    }

}

/*

 'System.Id': 52010,
      'System.AreaId': 1313,
      'System.AreaPath': 'BDC\\OAS\\Dev\\Curam',
      'System.TeamProject': 'BDC',
      'System.NodeName': 'Curam',
      'System.AreaLevel1': 'BDC',
      'System.AreaLevel2': 'OAS',
      'System.AreaLevel3': 'Dev',
      'System.AreaLevel4': 'Curam',
      'System.Rev': 26,
      'System.AuthorizedDate': '2023-03-21T17:43:48.48Z',
      'System.RevisedDate': '9999-01-01T00:00:00Z',
      'System.IterationId': 1386,
      'System.IterationPath': 'BDC\\OAS\\R1',
      'System.IterationLevel1': 'BDC',
      'System.IterationLevel2': 'OAS',
      'System.IterationLevel3': 'R1',
      'System.WorkItemType': 'Feature',
      'System.State': 'Removed',
      'System.Reason': 'Moved out of state Validated',
      'System.CreatedDate': '2022-06-06T17:09:27.1Z',
      'System.CreatedBy': [Object],
      'System.ChangedDate': '2023-03-21T17:43:48.48Z',
      'System.ChangedBy': [Object],
      'System.AuthorizedAs': [Object],
      'System.PersonId': 239167431,
      'System.Watermark': 570635,
      'System.CommentCount': 5,
      'System.Title': 'Assistive Technology - R1',
      'Microsoft.VSTS.Common.StateChangeDate': '2022-11-24T20:42:36.75Z',
      'Microsoft.VSTS.Common.ActivatedDate': '2022-06-10T20:33:19.153Z',
      'Microsoft.VSTS.Common.ActivatedBy': [Object],
      'Microsoft.VSTS.Common.Priority': 2,
      'Microsoft.VSTS.Common.StackRank': 1999911302,
      'Microsoft.VSTS.Common.ValueArea': 'Business',
      'Custom.ProjectorInitiative': 'OAS Solution',
      'Custom.Release': 'OAS R1',
      'Custom.FeatureCategory2': 'Accessibility',
      'WEF_D1D97C8FBDEC454F97F4E5EE8261C592_System.ExtensionMarker': false,
      'WEF_D1D97C8FBDEC454F97F4E5EE8261C592_Kanban.Column': 'Elaboration/Verification',
      'WEF_D1D97C8FBDEC454F97F4E5EE8261C592_Kanban.Column.Done': false,
      'WEF_3CE20D153EC9496789F98E3BAC9035FE_System.ExtensionMarker': false,
      'WEF_3CE20D153EC9496789F98E3BAC9035FE_Kanban.Column': 'Validated',
      'WEF_3CE20D153EC9496789F98E3BAC9035FE_Kanban.Column.Done': false,
      'WEF_D6D846AB2B574ABD861D1E67617A4361_System.ExtensionMarker': false,
      'WEF_D6D846AB2B574ABD861D1E67617A4361_Kanban.Column': 'Validated',
      'WEF_D6D846AB2B574ABD861D1E67617A4361_Kanban.Column.Done': false,
      'Custom.PlannedDevSprint_OAS': 'R1-S7',
      'WEF_BEA4A2B8DEA249C0B91FD5F921D71531_System.ExtensionMarker': false,
      'WEF_BEA4A2B8DEA249C0B91FD5F921D71531_Kanban.Column': 'Validated',
      'WEF_BEA4A2B8DEA249C0B91FD5F921D71531_Kanban.Column.Done': false,
      'Custom.PlannedDevStartSprint': 'R1-S7',
      'Custom.FeatureSource': 'OAS Business Team',
      'Custom.ForecastDevStartSprint': 'R1-S7',
      'Custom.ForecastDevCompleteSprint': 'R1-S7',
      'Custom.TargetedSubmissionDate': '2022-09-26T00:00:00Z',
      'System.Parent': 52007

      */