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

    async getRelatedNodes(): Promise<WalkedNode<BaseWorkItem>[]> {
        return []; // this.factory.getByWiql(`[System.WorkItemType] == "Hybrid Story" AND [System.Parent] = ${this.id}`);
    }

    async processNode(): Promise<void> {
        await super.processNode();
    }

    async render(template = 'feature-workitem.njk'): Promise<string> {
        return super.render(template)
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
            "displayName": "Serry, Samar NC",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Aeafd7f02-cb40-4799-ad15-473a554f7f16/_apis/Identities/b843b478-7281-64b2-a1c2-a4f15576d3ea",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.Yjg0M2I0NzgtNzI4MS03NGIyLWExYzItYTRmMTU1NzZkM2Vh"
                }
            },
            "id": "b843b478-7281-64b2-a1c2-a4f15576d3ea",
            "uniqueName": "samar.serry@hrsdc-rhdcc.gc.ca",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.Yjg0M2I0NzgtNzI4MS03NGIyLWExYzItYTRmMTU1NzZkM2Vh",
            "descriptor": "aad.Yjg0M2I0NzgtNzI4MS03NGIyLWExYzItYTRmMTU1NzZkM2Vh"
        },
        "System.CreatedDate": "2023-02-03T21:13:39.317Z",
        "System.CreatedBy": {
            "displayName": "Kalimuthu, Mangapoosan MK NC",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Aeafd7f02-cb40-4799-ad15-473a554f7f16/_apis/Identities/fcd7c050-8653-678b-8d3c-8188a0dbf351",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.ZmNkN2MwNTAtODY1My03NzhiLThkM2MtODE4OGEwZGJmMzUx"
                }
            },
            "id": "fcd7c050-8653-678b-8d3c-8188a0dbf351",
            "uniqueName": "manga.kalimuthu@servicecanada.gc.ca",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.ZmNkN2MwNTAtODY1My03NzhiLThkM2MtODE4OGEwZGJmMzUx",
            "descriptor": "aad.ZmNkN2MwNTAtODY1My03NzhiLThkM2MtODE4OGEwZGJmMzUx"
        },
        "System.ChangedDate": "2025-04-29T14:42:51.303Z",
        "System.ChangedBy": {
            "displayName": "Croker, Martin",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Aeafd7f02-cb40-4799-ad15-473a554f7f16/_apis/Identities/0fc1d223-916f-6668-89f8-3524c088d38b",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.MGZjMWQyMjMtOTE2Zi03NjY4LTg5ZjgtMzUyNGMwODhkMzhi"
                }
            },
            "id": "0fc1d223-916f-6668-89f8-3524c088d38b",
            "uniqueName": "martin.croker@servicecanada.gc.ca",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.MGZjMWQyMjMtOTE2Zi03NjY4LTg5ZjgtMzUyNGMwODhkMzhi",
            "descriptor": "aad.MGZjMWQyMjMtOTE2Zi03NjY4LTg5ZjgtMzUyNGMwODhkMzhi"
        },
        "System.AuthorizedAs": {
            "displayName": "Microsoft.VisualStudio.Services.TFS",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Aeafd7f02-cb40-4799-ad15-473a554f7f16/_apis/Identities/00000002-0000-8888-8000-000000000000",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/s2s.MDAwMDAwMDItMDAwMC04ODg4LTgwMDAtMDAwMDAwMDAwMDAwQDJjODk1OTA4LTA0ZTAtNDk1Mi04OWZkLTU0YjAwNDZkNjI4OA"
                }
            },
            "id": "00000002-0000-8888-8000-000000000000",
            "uniqueName": "00000002-0000-8888-8000-000000000000@2c895908-04e0-4952-89fd-54b0046d6288",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/s2s.MDAwMDAwMDItMDAwMC04ODg4LTgwMDAtMDAwMDAwMDAwMDAwQDJjODk1OTA4LTA0ZTAtNDk1Mi04OWZkLTU0YjAwNDZkNjI4OA",
            "descriptor": "s2s.MDAwMDAwMDItMDAwMC04ODg4LTgwMDAtMDAwMDAwMDAwMDAwQDJjODk1OTA4LTA0ZTAtNDk1Mi04OWZkLTU0YjAwNDZkNjI4OA"
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
            "displayName": "Rajeswar Reddy Yeddula",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Aeafd7f02-cb40-4799-ad15-473a554f7f16/_apis/Identities/75965955-69a1-6e13-8d0c-e66ed81b53c4",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.NzU5NjU5NTUtNjlhMS03ZTEzLThkMGMtZTY2ZWQ4MWI1M2M0"
                }
            },
            "id": "75965955-69a1-6e13-8d0c-e66ed81b53c4",
            "uniqueName": "rajeswarreddy.yeddula@hrsdc-rhdcc.gc.ca",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.NzU5NjU5NTUtNjlhMS03ZTEzLThkMGMtZTY2ZWQ4MWI1M2M0",
            "descriptor": "aad.NzU5NjU5NTUtNjlhMS03ZTEzLThkMGMtZTY2ZWQ4MWI1M2M0"
        },
        "Microsoft.VSTS.Common.ResolvedDate": "2023-06-21T14:08:55.633Z",
        "Microsoft.VSTS.Common.ResolvedBy": {
            "displayName": "Rajeswar Reddy Yeddula",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Aeafd7f02-cb40-4799-ad15-473a554f7f16/_apis/Identities/75965955-69a1-6e13-8d0c-e66ed81b53c4",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.NzU5NjU5NTUtNjlhMS03ZTEzLThkMGMtZTY2ZWQ4MWI1M2M0"
                }
            },
            "id": "75965955-69a1-6e13-8d0c-e66ed81b53c4",
            "uniqueName": "rajeswarreddy.yeddula@hrsdc-rhdcc.gc.ca",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.NzU5NjU5NTUtNjlhMS03ZTEzLThkMGMtZTY2ZWQ4MWI1M2M0",
            "descriptor": "aad.NzU5NjU5NTUtNjlhMS03ZTEzLThkMGMtZTY2ZWQ4MWI1M2M0"
        },
        "Microsoft.VSTS.Common.ResolvedReason": "Fixed",
        "Microsoft.VSTS.Common.ClosedDate": "2023-07-19T19:14:23.597Z",
        "Microsoft.VSTS.Common.ClosedBy": {
            "displayName": "Serry, Samar NC",
            "url": "https://spsprodcca1.vssps.visualstudio.com/Aeafd7f02-cb40-4799-ad15-473a554f7f16/_apis/Identities/b843b478-7281-64b2-a1c2-a4f15576d3ea",
            "_links": {
                "avatar": {
                    "href": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.Yjg0M2I0NzgtNzI4MS03NGIyLWExYzItYTRmMTU1NzZkM2Vh"
                }
            },
            "id": "b843b478-7281-64b2-a1c2-a4f15576d3ea",
            "uniqueName": "samar.serry@hrsdc-rhdcc.gc.ca",
            "imageUrl": "https://dev.azure.com/VP-BD/_apis/GraphProfile/MemberAvatars/aad.Yjg0M2I0NzgtNzI4MS03NGIyLWExYzItYTRmMTU1NzZkM2Vh",
            "descriptor": "aad.Yjg0M2I0NzgtNzI4MS03NGIyLWExYzItYTRmMTU1NzZkM2Vh"
        },
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
        "Microsoft.VSTS.TCM.ReproSteps": "<div><div style=\"box-sizing:border-box;\"><b style=\"box-sizing:border-box;\">Action Performed:</b> </div><div style=\"box-sizing:border-box;\"><ol start=1 type=1 style=\"box-sizing:border-box;padding-left:40px;margin-bottom:0cm;margin-top:0cm;\"><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Log in as Mail clerk user (mailclerk/ password) to Curam R1 E2E test environment using the link&nbsp;<a href=\"https://esdcoastd4oe2e.apps.hkz9kx2g.canadacentral.aroapp.io/Curam/logon.jsp\" style=\"box-sizing:border-box;text-decoration:underline;\">https://esdcoastd4oe2e.apps.hkz9kx2g.canadacentral.aroapp.io/Curam/logon.jsp</a></span> </li><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Select ‘Register a person and create Foreign Engagement Case’ under ‘Old Age Security (OAS)’ under shortcut.</span> </li><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Fill all the mandatory field values and complete the person registration and create FEC (Person:&nbsp;<b style=\"box-sizing:border-box;\">Any Name, DOB 1980-10-10</b>, FEC for<span>&nbsp;</span><b style=\"box-sizing:border-box;\">USA</b>).</span> </li><li style=\"box-sizing:border-box;margin:0cm;\"><font face=\"Arial, sans-serif\" style=\"box-sizing:border-box;\"><span style=\"box-sizing:border-box;font-size:10pt;\">Add the<span>&nbsp;</span></span><span style=\"box-sizing:border-box;font-size:13.3333px;\">Foreign</span><span style=\"box-sizing:border-box;font-size:10pt;\">&nbsp;</span><span style=\"box-sizing:border-box;font-size:13.3333px;\">Application</span><span style=\"box-sizing:border-box;font-size:10pt;\">&nbsp;to the FEC case.</span></font> </li><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Under the person’s profile, record communications under contacts. System should generate a task for this.</span> </li><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Login as Supervisor, search the task and assign the task generated for the recorded communication to IO Agent.</span> </li><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Logout &amp; login as ioagent and go to Inbox.</span> </li><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Allocate the task generated at Step 5 to the ioagent's my task.</span> </li><li style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;color:black;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;\">Verify the task details.</span> </li> </ol><p style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b style=\"box-sizing:border-box;\"><br style=\"box-sizing:border-box;\"></b></span> </p><p style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b style=\"box-sizing:border-box;\">Expected Result:</b></span> </p><ul style=\"box-sizing:border-box;padding:0px 0px 0px 40px;margin-bottom:0cm;\"><li style=\"box-sizing:border-box;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\">The Task name should be as below:</span> </li><ul><li style=\"box-sizing:border-box;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b>Received </b></span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:rgb(200, 38, 19);\"><b>2/3/3023</b></span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:rgb(200, 38, 19);\"> - </span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:rgb(200, 38, 19);\"><b>EN</b></span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b> Privacy Request - Tier 2 Request for Person Any Name 30000057</b></span> </li> </ul> </ul><p style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b style=\"box-sizing:border-box;\"><br style=\"box-sizing:border-box;\"></b></span> </p><p style=\"box-sizing:border-box;margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b style=\"box-sizing:border-box;\">Actual Result:</b></span> </p><ul style=\"box-sizing:border-box;padding:0px 0px 0px 40px;margin-bottom:0cm;\"><li style=\"box-sizing:border-box;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\">The Task name displayed as below (there is a </span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:rgb(200, 38, 19);\">hyphen (-) missing after the date value)</span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\">:</span> </li><ul style=\"box-sizing:border-box;padding:0px 0px 0px 40px;\"><li style=\"box-sizing:border-box;\"><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b style=\"box-sizing:border-box;\">Received </b></span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:rgb(200, 38, 19);\"><b style=\"box-sizing:border-box;\">2/3/3023</b></span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:rgb(6, 64, 12);\"><b style=\"box-sizing:border-box;\"><span style=\"color:rgb(200, 38, 19);\">&nbsp;</span></b></span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:rgb(200, 38, 19);\"><b style=\"box-sizing:border-box;\">EN</b></span><span style=\"box-sizing:border-box;font-size:10pt;font-family:Arial, sans-serif;color:black;\"><b style=\"box-sizing:border-box;\"> Privacy Request - Tier 2 Request for Person Any Name 30000057</b></span> </li> </ul> </ul> </div> </div><div><br> </div><div>Please refer 'Privacy Request - Tier 2 Task.png' for more details. </div><div><hr style=\"border-color:black;\"><table><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">2023-02-03  9:14 PM </td><td style=\"vertical-align:top;padding:2px 7px 2px 10px;\">Bug filed on &quot;FB-MI-SSA-13_TC01 (NEW): ATIP requests information from IO, Client wants copy of the FB file which includes letters, applications and documents( New Data )&quot; </td></tr></table><hr style=\"border-color:black;\"><table><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">Step no. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">Result </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">Title </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">1. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><b>Pre-Requisites :<br></b> </p><ul style=\"padding-left:40px;color:rgb(0, 0, 0);font-size:14px;white-space:normal;\"><li style=\"list-style:inherit;\"><span style=\"font-family:Calibri;font-size:14.6667px;\">&nbsp;Registered client needs to be created in the system.&nbsp;</span> </li><li style=\"list-style:inherit;\"><span style=\"font-family:Calibri;font-size:14.6667px;\">FB application needs to be exist.</span> </li><li> </li><li style=\"list-style:inherit;\"><span style=\"font-family:Calibri;font-size:14.6667px;\">Foreign Engagement Case (FEC) needs to be exist.</span><span style=\"font-family:Calibri;font-size:14.6667px;text-align:left;\"><span style=\"font-size:14px;text-align:start;\"><font face=Calibri><br></font></span></span><p>[Note: Previous manual data (i.e. existing new data) can be used for execution in this test case.]<br> </p> </li><li> </li><li> </li> </ul><p><br> </p> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">2. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><p style=\"font-weight:bold;\">Login to Curam as User1 </p> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">2.1 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Pre-conditions:<br>User is authorized to access the system<br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Pre-conditions are met<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">2.2 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Verify that user is able to login to Curam Integration environment (link below) using the following credentials:<br>@User1_Username , @User1_Password<br><br>Curam Integration R1 Environment link: <br>&nbsp;https://esdcoasqaintbe.apps.vp2aqrji.canadacentral.aroapp.io/Curam/logon.jsp<br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>User logged in successfully, home page is displayed <br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: E2E environment: https://esdcoastd4oe2e.apps.hkz9kx2g.canadacentral.aroapp.io/Curam/logon.jsp </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">3. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><b>Note:</b> The Privacy Request- Tier 2 Incoming direction scenario is for when ATIP group sends in an action for support request to processing for which a task is required for an Agent to respond to. </p> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">4. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><p style=\"font-weight:bold;\">Search for Person by FName, Lname, Country </p> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">4.1 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Pre-conditions:<br>@searchUser has been authenticated<br>@searchUser is authorized to Search for Person </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Pre-conditions are met </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">4.2 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><div><p>Navigate to 'Cases and Outcomes' tab, click on the Shortcuts tab on the left hand menu, go to 'Searches', then click on Person option<br> </p> </div> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Person Search page is displayed<br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Cases and outcomes tab does not exist, only clients tab </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">4.3 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Search for Person by entering their first name, last name and country and click on 'Search' button: @SearchFirstName, @SearchLastName, @SearchCountry<br>Note: <span style=\"background-color:rgb(255, 255, 255);color:rgb(22, 22, 22);font-size:14px;white-space:normal;\">First Name and Last Name require at least 2 characters.<br>ex.: ba%</span><br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Person's information is displayed in Search Results cluster<br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Client name is Any Name 1980-10-10 </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">4.4 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Click on Reference number hyperlink to open the Person's profile. If the person is not found, go to &quot;Register Person&quot; step. </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><p>Person's profile with personal information is displayed </p> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">5. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><p style=\"font-weight:bold;\">Record Communication on a FEC </p> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">5.1 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Navigate to Contacts and select Communications inline tab </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Communication list is displayed<br> </p><p><br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">5.2 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><div><p>Click on the hyperlink of Record Communication...<br> </p><p><br> </p> </div> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Record Communication modal is displayed<br> </p><p><br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">5.3 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Enter one of the following information and click Next:<br>Case Participant=@FECRecordCommunicationCaseParticipant<br>Participant=@FECRecordCommunicationParticipant (select participant type, click on the magnify icon, and search)<br>Correspondent Name=@FECRecordCommunicationCorrespondentName<br>Case Member=@FECRecordCommunicationCaseMember </p><p><br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Record Communication second page is displayed<br> </p><p><br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">5.4 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Enter the following information and click Save (Mandatory fields are marked with asterisk*):<br>Subject*=@FECRecordCommunicationSubject<br>Text*=@FECRecordCommunicationText<br>Direction=@FECRecordCommunicationDirection<br>Date=@FECRecordCommunicationDate<br>Method=@FECRecordCommunicationMethod<br>Type=@FECRecordCommunicationType<br>Correspondent Type=@FECRecordCommunicationCorrespondentType<br><br><br> </p><p><br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>The communication is recorded<br> </p><p><br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">5.5 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Enter Associated Files fields (Mandatory fields are marked with asterisk*):<br>Location*=@RCFECLocation<br>Reference*=@RCFECRefernce&nbsp;<br> </p> </div><div style=\"padding-top:10px;\"><div>Comments: Missing details are saving? I saved the record communication </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">5.6 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Select all from the Regarding Case Member dropdown list and click on Search<br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>The communication record is shown on the list<br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Missing steps on where do we find the Case Member dropdown list? </div><div>Once the record communication was saved  I expanded the ATIP Privacy request and received an error &quot;An un-handled server exception occurred. Please contact your administrator&quot;, bug 102792 created </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">6. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Background : Once Tier 2 privacy request is received from external party AITP Group , system triggers work item and creates Foreign Application Task.<br> </p><p><br> </p> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">7. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><p style=\"font-weight:bold;\">Log out from Curam </p> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">7.1 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Pre-conditions:<br>User is authorized to access the system<br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Pre-conditions are met<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">7.2 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Navigate to user profile picture in the top right hand corner of the screen. Then, click on user profile picture </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Application menu drop down list displayed </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">7.3 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Click &quot;Log Out&quot; on the bottom of the menu. </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><p>User is directed to Log Out Screen </p> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">7.4 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\">When prompted with &quot;Are you sure you want to log out?&quot;, click Log Out<div style=\"padding-top:10px;\">Expected Result </div><div><p>User is successfully logged out </p> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><p style=\"font-weight:bold;\">Assign Work Task to User </p> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8.1 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><div><div><p>Log in as a Supervisor </p> (@SupervisorUsername, @SupervisorPassword) </div><p><br> </p> </div> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>System logs in as a supervisor </p><p><br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Login using supervisor as mosupervisor was not working I used supervisor instead </div><div>E2E environment: https://esdcoastd4oe2e.apps.hkz9kx2g.canadacentral.aroapp.io/Curam/ </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8.2 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>User selects 'Inbox' tab at the top of the page and then user selects shortcuts panel and Selects 'Available Tasks' </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Search function for available tasks appears </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8.3 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div>In the “Assigned To” list, select the Work Queue that was\n<p class=MsoNormal>assigned the the Supervisor earlier in the test case. Click “Search”. </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>A list of available tasks in the work queue is displayed.<br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Specific work queue that is needed is absent. Specific work queue to be selected must be added as parameters. Work item found in New Brunswick IO Processing queue (work queue) </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8.4 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div>Find the task generated by the Mail Clerk earlier in the\n<p class=MsoNormal>test case, click the checkbox next to it, and then click “Add to My Tasks”\n</p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>The task is assigned to the IO Supervisor (to be forwarded shortly)<br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Step missing. User receives a Get selected tasks screen and needs to select Yes or no to proceed. </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8.5 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div>In shortcuts, click “My Tasks”, click the “…” next to the\n<p class=MsoNormal>task that was just put into My Tasks, then click “Forward”\n</p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>The Forward modal appears<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8.6 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\">Click the Magnifying glass and fill in the values:<br><p class=MsoNormal>\nFirst Name = @NewUserFirstName3\n</p><p class=MsoNormal>Last Name = @NewUserLastName3 </p>\n<p class=MsoNormal>To fill in the details of the IO Benefit Officer. Click “Search”,\nthen “Select” the resulting user whose username is @NewUserUsername3. On the\nForward Task Modal, click “Save”\n</p><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>The task is now available for the IO Benefit Officer to search.<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">8.7 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Log out as Supervisor<br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>User is no longer logged in.<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">9. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><p style=\"font-weight:bold;\">Login to Curam as User2 </p> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">9.1 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><div><p>Pre-conditions:<br>User is authorized to access the system<br> </p> </div> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Pre-conditions are met<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">9.2 </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Verify that user is able to login to Curam Integration environment (link below) using the following credentials:<br>@User2_Username, @User2_Password<br><br><br>Curam Integration R1 Environment link: <br>&nbsp;https://esdcoasqaintbe.apps.vp2aqrji.canadacentral.aroapp.io/Curam/logon.jsp<br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>User logged in successfully, home page is displayed. [Logged in as ioagent, not moioagent] </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: E2E environment: https://esdcoastd4oe2e.apps.hkz9kx2g.canadacentral.aroapp.io/Curam/ </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">10. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><span style=\"font-size:10pt;text-indent:-18pt;font-weight:inherit;\">Navigate to Cases and Outcomes\\clients  tab and click on</span> </p><p class=MsoListParagraph style=\"margin-bottom:0.0001pt;text-indent:-18pt;line-height:normal;\"><span style=\"font-size:10pt;background-image:initial;background-position:initial;background-repeat:initial;background-attachment:initial;\">shortcuts--&gt; Searches--&gt; Person... to search for client profile</span> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Search page should open <br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: </div><div>cases and outcomes tab is not available. Only clients and cases. Select clients and cases and continue </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">11. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><span style=\"background-image:initial;background-position:initial;background-repeat:initial;background-attachment:initial;font-size:10pt;line-height:14.2667px;\">Enter FirstName, Last Name and Date of Birth on the Person Search Page then click Search button</span>\n</p><div><span style=\"background-image:initial;background-position:initial;background-repeat:initial;background-attachment:initial;font-size:10pt;line-height:14.2667px;\"><br></span> </div> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Search results should populate the client <br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Client name is Any Name and DOB is 1980-10-10 </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">12. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>On the Person Page , navigate to Cases and Applications tab --&gt; Cases Section<br>Select the Foreign Engagement Case exists by clicking on Case Reference number <br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>FEC should be open <br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">13. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><span style=\"\">Click on the Foreign Benefit tab on FEC page, click Foreign Application section</span><br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>A list of Foreign Applications appeared. </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">14. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>The user view the Foreign application by expanding the toggle to view the expandable page </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>User should be able to view the Foreign Application </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">15. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><span style=\"\">Click on the print button located in the top right corner above the table.</span><span style=\"\">  </span><br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Print page should open </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">16. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>User view the page then click print button to proceed </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Foreign Application should be printed </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: As I'm not connected to a printer I only have the option of saving as a PDF, I have also change the destination to print to evernote and and I was able to select print but I received an error message stating please install evernote. </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">17. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Click on Inbox and select Available Tasks under Tasks in Shortcuts </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Available Tasks page is opened<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">18. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>&nbsp;Ensure [User] is selected in Assigned To Search Criteria, and click Search </p><p><br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>&nbsp;Task search results are shown </p><p><br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">19. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Click the ellipsis &quot;...&quot; of the task previously assigned to IOAgent, and select Add to My Tasks... </p><p><br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>&nbsp;Add to My Tasks modal is displayed </p><p><br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Missing a step, Add to My Tasks pop up window open with comment. Comment input as test and then I click save. </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">20. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>Click on Save<br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Task is successfully added to My Tasks<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">21. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><p>Navigate to My Tasks -&gt; My Open Tasks<br> </p><div style=\"padding-top:10px;\">Expected Result </div><div><p>Newly added task is displayed in My Open Tasks list<br> </p> </div><div style=\"padding-top:10px;\"><div>Comments: The task name is now displaying correctly, it should read Received 2/3/2023 - EN Privacy Request - instead of Received 2/3/2023 EN Privacy Request - ... Bug created 102826 </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">22. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><span style=\"\">Select assigned task then add comment to the task </span>by clicking &quot;...&quot; next to the task and &quot;Add Comment&quot;. <br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Add comment page should be opened </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">23. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p>User write the comment = &quot;the documents required have been printed and sent to ATIP group for processing&quot; for the task , then click &quot;Save&quot; </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Comments should be in the system. </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">24. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:green;\">Passed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><div><p>Click on Inbox in the navigation bar click on My Tasks --&gt; My Open Tasks<br> </p> </div> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>IO Agent should see assigned tasks<br> </p> </div> </div> </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">25. </td><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;color:red;\">Failed </td><td style=\"vertical-align:top;padding:2px 7px;\"><div><p><span style=\"\">Select assigned task with Subject = Attachment to a Foreign Engagement Case. </span> change task status to Closed by clicking &quot;...&quot; next to the task and &quot;Close&quot;. <br> </p> </div><div style=\"padding-top:10px;\">Expected Result </div><div><div><p>Work item status should be updated to Closed and the foreign application is set by the system to Completed.<br> </p> </div> </div><div style=\"padding-top:10px;\"><div>Comments: Task subject is not Attachment to a Foreign Engagement Case it is EN Privacy Request - Tier 2 request for person Any name.... </div><div>no foreign application was created for this FEC case not able to verify foreign application status. Task was closed but the liaison remains active. In order to verify task closed, steps need to be provided on where to find it as it does not stay present in the list of tasks. </div> </div> </td></tr></table><hr style=\"border-color:white;\"><table><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">Test Configuration: </td><td style=\"vertical-align:top;padding:2px 7px 2px 100px;\">Operating System </td></tr></table><hr style=\"border-color:white;\"><table style=\"width:100%;\" class=dataIterationTable><tr><td style=\"vertical-align:top;padding:2px 7px;font-weight:bold;\">Data iteration: </td><td style=\"vertical-align:top;padding:2px 7px 2px 100px;\">1 of 1 </td></tr><table style=\"width:100%;\" class=dataRowTable><tr style=\"font-weight:bold;\"><td style=\"vertical-align:top;padding:2px 7px;\">User1_Username </td><td style=\"vertical-align:top;padding:2px 7px;\">User1_Password </td><td style=\"vertical-align:top;padding:2px 7px;\">SearchFirstName </td><td style=\"vertical-align:top;padding:2px 7px;\">SearchLastName </td><td style=\"vertical-align:top;padding:2px 7px;\">SearchCountry </td><td style=\"vertical-align:top;padding:2px 7px;\">searchUser </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationCaseParticipant </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationParticipant </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationCorrespondentName </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationCaseMember </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationSubject </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationText </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationDirection </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationDate </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationMethod </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationType </td><td style=\"vertical-align:top;padding:2px 7px;\">FECRecordCommunicationCorrespondentType </td><td style=\"vertical-align:top;padding:2px 7px;\">RCFECLocation </td><td style=\"vertical-align:top;padding:2px 7px;\">RCFECRefernce </td><td style=\"vertical-align:top;padding:2px 7px;\">SupervisorUsername </td><td style=\"vertical-align:top;padding:2px 7px;\">SupervisorPassword </td><td style=\"vertical-align:top;padding:2px 7px;\">NewUserFirstName3 </td><td style=\"vertical-align:top;padding:2px 7px;\">NewUserUsername3 </td><td style=\"vertical-align:top;padding:2px 7px;\">NewUserLastName3 </td><td style=\"vertical-align:top;padding:2px 7px;\">User2_Username </td><td style=\"vertical-align:top;padding:2px 7px;\">User2_Password </td></tr><tr><td style=\"vertical-align:top;padding:2px 7px;\">momailclerk </td><td style=\"vertical-align:top;padding:2px 7px;\">password </td><td style=\"vertical-align:top;padding:2px 7px;\"> </td><td style=\"vertical-align:top;padding:2px 7px;\"> </td><td style=\"vertical-align:top;padding:2px 7px;\"> </td><td style=\"vertical-align:top;padding:2px 7px;\"> </td><td style=\"vertical-align:top;padding:2px 7px;\"> </td><td style=\"vertical-align:top;padding:2px 7px;\"> </td><td style=\"vertical-align:top;padding:2px 7px;\">Bill Brown </td><td style=\"vertical-align:top;padding:2px 7px;\"> </td><td style=\"vertical-align:top;padding:2px 7px;\">ATIP Privacy Request </td><td style=\"vertical-align:top;padding:2px 7px;\">ATIP Privacy Request - Tier 2 </td><td style=\"vertical-align:top;padding:2px 7px;\">Incoming </td><td style=\"vertical-align:top;padding:2px 7px;\">current date </td><td style=\"vertical-align:top;padding:2px 7px;\">Hardcopy </td><td style=\"vertical-align:top;padding:2px 7px;\">Privacy Request - Tier 2 </td><td style=\"vertical-align:top;padding:2px 7px;\">ATIP Group </td><td style=\"vertical-align:top;padding:2px 7px;\">https://014gc-my.sharepoint.com/:x:/r/personal/shenji_liu_hrsdc-rhdcc_gc_ca/Documents/Dummy%20Attachment.xlsx?d=w38ee24f744164c7584e0f8b2697265a2&amp;csf=1&amp;web=1&amp;e=Xbxcff </td><td style=\"vertical-align:top;padding:2px 7px;\">123456 </td><td style=\"vertical-align:top;padding:2px 7px;\">mosupervisor </td><td style=\"vertical-align:top;padding:2px 7px;\">password </td><td style=\"vertical-align:top;padding:2px 7px;\">Mo </td><td style=\"vertical-align:top;padding:2px 7px;\">moioagent </td><td style=\"vertical-align:top;padding:2px 7px;\">Ioagent </td><td style=\"vertical-align:top;padding:2px 7px;\">moioagent </td><td style=\"vertical-align:top;padding:2px 7px;\">password </td></tr></table></table><hr style=\"border-color:white;\"><br> </div>",
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