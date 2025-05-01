import { WalkedNode } from "../Walker";
import { BaseWorkItem } from "./BaseWorkItem";
import { ADOWorkItem, ADOWorkItemBaseFields, WorkItemFactoryIf, isADOWorkItem } from "./types";

export function isADOBugWorkItem(x: any): x is ADOWorkItem<ADOWorkItemBugFields> {
    return isADOWorkItem(x) && isADOWorkItemBugFields(x.fields)
}

export interface ADOWorkItemBugFields extends ADOWorkItemBaseFields {
    "Custom.Workaround"?: string;
    "Custom.Partner"?: string;
    "Microsoft.VSTS.TCM.ReproSteps"?: string;
}

export function isADOWorkItemBugFields(x: any): x is ADOWorkItemBugFields {
    const result = {
        workaround: (x["Custom.Workaround"] === undefined || typeof x["Custom.Workaround"] === "string"),
        reproSteps: (x["Microsoft.VSTS.TCM.ReproSteps"] === undefined || typeof x["Microsoft.VSTS.TCM.ReproSteps"] === "string"),
        partner:  (x["Custom.Partner"] === undefined || typeof x["Custom.Partner"] === "string"),
    }
    return Object.values(result).every(x => x)
}

/**
 * Bug
 */
export class Bug extends BaseWorkItem {

    workaround?: string;
    reproSteps?: string;
    partner?: string;

    constructor(data: ADOWorkItem<ADOWorkItemBugFields>, factory: WorkItemFactoryIf) {
        super(data, factory);
        this.workaround = data.fields["Custom.Workaround"];
        this.reproSteps= data.fields["Microsoft.VSTS.TCM.ReproSteps"];
        this.partner = data.fields["Custom.Partner"];
    }

    getRelatedNodes(): Promise<WalkedNode<BaseWorkItem>[]> {
        return Promise.resolve([]);
    }

}

/*

{
    "id": 102826,
    "rev": 35,
    "fields": {
        "System.Id": 102826,
        "System.AreaId": 1428,
        "System.AreaPath": "BDC\\OAS\\Dev\\Curam\\Case-Wkld-UA",
        "System.TeamProject": "BDC",
        "System.NodeName": "Case-Wkld-UA",
        "System.AreaLevel1": "BDC",
        "System.AreaLevel2": "OAS",
        "System.AreaLevel3": "Dev",
        "System.AreaLevel4": "Curam",
        "System.AreaLevel5": "Case-Wkld-UA",
        "System.Rev": 35,
        "System.AuthorizedDate": "2025-04-29T14:42:51.303Z",
        "System.RevisedDate": "9999-01-01T00:00:00Z",
        "System.IterationId": 2328,
        "System.IterationPath": "BDC\\OAS\\Production\\R1.1.0\\R1.1.0 - S1",
        "System.IterationLevel1": "BDC",
        "System.IterationLevel2": "OAS",
        "System.IterationLevel3": "Production",
        "System.IterationLevel4": "R1.1.0",
        "System.IterationLevel5": "R1.1.0 - S1",
        "System.WorkItemType": "Bug",
        "System.State": "Closed",
        "System.Reason": "Verified",
        "Custom.Workaround"
        "System.AssignedTo": {
            "displayName": "X",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Ax",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.Yxh"
                }
            },
            "id": "b843b478-7281-64b2-a1c2-x",
            "uniqueName": "x@x",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.Yjgx",
            "descriptor": "aad.x"
        },
        "System.CreatedDate": "2023-02-03T21:13:39.317Z",
        "System.CreatedBy": {...
        },
        "System.ChangedDate": "2025-04-29T14:42:51.303Z",
        "System.ChangedBy": {
            ...
        },
        "System.AuthorizedAs": {
            ...
        },
        "System.PersonId": 208395917,
        "System.Watermark": 2636208,
        "System.CommentCount": 7,
        "System.Title": "E2E Defect - Task name display issue",
        "System.BoardColumn": "Closed",
        "System.BoardColumnDone": false,
        "Microsoft.VSTS.Common.Activity": "Testing",
        "Microsoft.VSTS.Common.StateChangeDate": "2023-07-19T19:14:23.597Z",
        "Microsoft.VSTS.Common.ActivatedDate": "2023-06-21T14:08:55.633Z",
        "Microsoft.VSTS.Common.ActivatedBy": {
            ...},
        "Microsoft.VSTS.Common.ResolvedDate": "2023-06-21T14:08:55.633Z",
        "Microsoft.VSTS.Common.ResolvedBy": {
            ....},
        "Microsoft.VSTS.Common.ResolvedReason": "Fixed",
        "Microsoft.VSTS.Common.ClosedDate": "2023-07-19T19:14:23.597Z",
        "Microsoft.VSTS.Common.ClosedBy": {....},
        "Microsoft.VSTS.Common.Priority": 4,
        "Microsoft.VSTS.Common.Severity": "4 - Low",
        "Microsoft.VSTS.Common.ValueArea": "Business",
        "Custom.BugCategory": "Internal",
        "Custom.BugClassification": "Functional",
        "WEF_8444ED63DF264932A4D5B42538F87DDD_System.ExtensionMarker": true,
        "WEF_8444ED63DF264932A4D5B42538F87DDD_Kanban.Column": "Closed",
        "WEF_8444ED63DF264932A4D5B42538F87DDD_Kanban.Column.Done": false,
        "WEF_CB492CF12A7C4735AD1908434B6A946A_System.ExtensionMarker": false,
        "WEF_CB492CF12A7C4735AD1908434B6A946A_Kanban.Column": "Closed",
        "WEF_CB492CF12A7C4735AD1908434B6A946A_Kanban.Column.Done": false,
        "Microsoft.VSTS.TCM.ReproSteps": "x",
        "System.Tags": "BISB-approved; Cosmetic; Deferred; E2E; E2E_Integration_Bug; ESDC Exploratory - R1; FDD; Low effort; OAS TE Testing Team; R1.1; R1-Business-E2E; Valid"
    },
    "relations": [
        {
            "rel": "Microsoft.VSTS.Common.TestedBy-Forward",
            "url": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/98033",
            "attributes": {
                "isLocked": false,
                "name": "Tested By"
            }
        },
        {
            "rel": "Microsoft.VSTS.Common.Affects-Forward",
            "url": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/98033",
            "attributes": {
                "isLocked": false,
                "name": "Affects"
            }
        },
        {
            "rel": "ArtifactLink",
            "url": "vstfs:///TestManagement/TcmResultAttachment/62852.100000.26218",
            "attributes": {
                "authorizedDate": "2023-02-03T21:15:11.493Z",
                "id": 19200660,
                "resourceCreatedDate": "2023-02-03T21:15:11.493Z",
                "resourceModifiedDate": "2023-02-03T21:15:11.493Z",
                "revisedDate": "9999-01-01T00:00:00Z",
                "comment": "test case 98033.docx",
                "name": "Result Attachment"
            }
        },
        {
            "rel": "ArtifactLink",
            "url": "vstfs:///TestManagement/TcmResult/62852.100000",
            "attributes": {
                "authorizedDate": "2023-02-03T21:15:11.493Z",
                "id": 19200659,
                "resourceCreatedDate": "2023-02-03T21:15:11.493Z",
                "resourceModifiedDate": "2023-02-03T21:15:11.493Z",
                "revisedDate": "9999-01-01T00:00:00Z",
                "name": "Test Result"
            }
        },
        {
            "rel": "AttachedFile",
            "url": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/attachments/70a5c4d7-acf4-48e7-b8b0-294b85d342b9",
            "attributes": {
                "authorizedDate": "2023-02-03T21:13:39.317Z",
                "id": 19200641,
                "resourceCreatedDate": "2023-02-03T21:04:41.857Z",
                "resourceModifiedDate": "2023-02-03T21:04:41.857Z",
                "revisedDate": "9999-01-01T00:00:00Z",
                "resourceSize": 448267,
                "name": "Privacy Request - Tier 2 Task.png"
            }
        }
    ],
    "_links": {
        "self": {
            "href": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/102826"
        },
        "workItemUpdates": {
            "href": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/102826/updates"
        },
        "workItemRevisions": {
            "href": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/102826/revisions"
        },
        "workItemComments": {
            "href": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/102826/comments"
        },
        "html": {
            "href": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_workitems/edit/102826"
        },
        "workItemType": {
            "href": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItemTypes/Bug"
        },
        "fields": {
            "href": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/fields"
        }
    },
    "url": "https://dev.azure.com/VP-BD/7f843e74-7fa0-49a2-8e9b-6308f6cab07e/_apis/wit/workItems/102826"
}
*/