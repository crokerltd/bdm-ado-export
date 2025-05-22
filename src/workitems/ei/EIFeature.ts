import { ADOWorkItem, WorkItemFactoryIf, isADOWorkItem } from "../ado/types";
import { ADOWorkItemFeatureFields, Feature, isADOFeatureWorkItem } from "../ado/Feature";

export function isEIFeatureWorkItem(x: any): x is ADOWorkItem<EIWorkItemFeatureFields> {
    return isADOWorkItem(x) && x.fields["System.WorkItemType"] === "Feature" && isADOFeatureWorkItem(x) && isEIWorkItemFeatureFields(x.fields)
}

export interface EIWorkItemFeatureFields extends ADOWorkItemFeatureFields {
    "Custom.ReleaseEI"?: string;
}

export function isEIWorkItemFeatureFields(x: any): x is EIWorkItemFeatureFields {
    const result = {
        release: (x["Custom.ReleaseEI"] === undefined || typeof x["Custom.ReleaseEI"] === "string")
    }
    return Object.values(result).every(x => x)
}


export class EIFeature extends Feature {

    releaseEI?: string;

    constructor(data: ADOWorkItem<EIWorkItemFeatureFields>, factory: WorkItemFactoryIf, leafNode?: boolean) {
        super(data, factory, leafNode);
        this.releaseEI = data.fields["Custom.ReleaseEI"]
    }

}

/*
{
    "name": "Product Feature",
    "referenceName": "BDM-CBD-EI-Agilev1.0.ProductFeature",
    "description": "",
    "color": "ae88b9",
    "icon": {
        "id": "icon_clipboard",
        "url": "https://tfsprodcca1.visualstudio.com/_apis/wit/workItemIcons/icon_clipboard?color=ae88b9&v=2"
    },
    "isDisabled": false,
    "xmlForm": "<FORM><Layout HideReadOnlyEmptyFields=\"true\" HideControlBorders=\"true\"><Group Margin=\"(10,0,0,0)\"><Column PercentWidth=\"94\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"System.Title\" Type=\"FieldControl\" EmptyText=\"Enter title here\" ControlFontSize=\"large\" /></Column><Column PercentWidth=\"6\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"System.Id\" Type=\"FieldControl\" ControlFontSize=\"large\" /></Column></Group><Group Margin=\"(10,10,0,0)\"><Column PercentWidth=\"30\"><Control Label=\"Assi&amp;gned To\" LabelPosition=\"Left\" FieldName=\"System.AssignedTo\" Type=\"FieldControl\" EmptyText=\"Unassigned\" /><Control Label=\"Stat&amp;e\" LabelPosition=\"Left\" FieldName=\"System.State\" Type=\"FieldControl\" /><Control Label=\"Reason\" LabelPosition=\"Left\" FieldName=\"System.Reason\" Type=\"FieldControl\" /></Column><Column PercentWidth=\"40\"><Control Label=\"\" LabelPosition=\"Top\" Type=\"LabelControl\" /><Control Label=\"&amp;Area\" LabelPosition=\"Left\" FieldName=\"System.AreaPath\" Type=\"WorkItemClassificationControl\" /><Control Label=\"Ite&amp;ration\" LabelPosition=\"Left\" FieldName=\"System.IterationPath\" Type=\"WorkItemClassificationControl\" /></Column><Column PercentWidth=\"30\"><Control Label=\"\" LabelPosition=\"Top\" Name=\"2\" Type=\"LabelControl\" /><Control Label=\"\" LabelPosition=\"Top\" Name=\"3\" Type=\"LabelControl\" /><Control Label=\"Last Updated Date\" LabelPosition=\"Left\" FieldName=\"System.ChangedDate\" Type=\"DateTimeControl\" ReadOnly=\"True\" /></Column></Group><TabGroup Margin=\"(0,10,0,0)\"><Tab Label=\"Details\"><Group><Column PercentWidth=\"50\"><Group><Column PercentWidth=\"100\"><Group Label=\"Description\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"System.Description\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Acceptance Criteria\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Microsoft.VSTS.Common.AcceptanceCriteria\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Feature Boundaries\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.FeatureBoundaries\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Assumptions and Constraints\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Assumptions\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Stakeholders\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Stakeholders\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Relevant Context\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.RelevantContext\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Outcome(s)\"><Column PercentWidth=\"100\"><Control Label=\"Outcomes\" LabelPosition=\"Top\" FieldName=\"Custom.Outcomes\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Pain Points\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.PainPoints\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column><Column PercentWidth=\"50\"><Group Margin=\"(20,0,0,0)\"><Column PercentWidth=\"25\"><Group><Column PercentWidth=\"100\"><Group Label=\"Work Category Grouping\"><Column PercentWidth=\"100\"><Control Label=\"Feature Type\" LabelPosition=\"Top\" FieldName=\"Custom.FeatureType\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Feature Category\" LabelPosition=\"Top\" FieldName=\"Custom.FeatureCategory\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Planning and Progress\"><Column PercentWidth=\"100\"><Control Label=\"Locked Feature\" LabelPosition=\"Top\" FieldName=\"Custom.FNUFlag\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Release\" LabelPosition=\"Top\" FieldName=\"Custom.ReleaseEI\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Planned PI\" LabelPosition=\"Top\" FieldName=\"Custom.PlannedPI\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Estimated Percentage Done\" LabelPosition=\"Top\" FieldName=\"Custom.EstimatedPercentageDone\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Planned Story Points\" LabelPosition=\"Top\" FieldName=\"Microsoft.VSTS.Scheduling.StoryPoints\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Actual Story Points\" LabelPosition=\"Top\" FieldName=\"Custom.ActualStoryPoints\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Planned Start Date\" LabelPosition=\"Top\" FieldName=\"Microsoft.VSTS.Scheduling.StartDate\" Type=\"DateTimeControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Planned End Date\" LabelPosition=\"Top\" FieldName=\"Microsoft.VSTS.Scheduling.TargetDate\" Type=\"DateTimeControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Updated Target Date\" LabelPosition=\"Top\" FieldName=\"Custom.UpdatedTargetDate\" Type=\"DateTimeControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"SI Scope Change\"><Column PercentWidth=\"100\"><Control Label=\"SI Scope Changed\" LabelPosition=\"Top\" FieldName=\"Custom.SIScopeChanged\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"SI Scope Change Reasoning\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.SIScopeChangeReasoning\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column><Column PercentWidth=\"25\"><Group><Column PercentWidth=\"100\"><Group Label=\"Delivery Confidence\"><Column PercentWidth=\"100\"><Control Label=\"Delivery Confidence\" LabelPosition=\"Top\" FieldName=\"Custom.AreyouconfidentthisfeaturewillbedeliveredwithinthePI\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Delivery Confidence Rationale\" LabelPosition=\"Top\" FieldName=\"Custom.DeliveryConfidenceRationale\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Research\"><Column PercentWidth=\"100\"><Control Label=\"Usability Testing Required\" LabelPosition=\"Top\" FieldName=\"Custom.UserResearch\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Deployment\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Deployments\" Type=\"DeploymentsControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Development\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Development\" Type=\"LinksControl\" Margin=\"(0,0,0,10)\"><LinksControlOptions><WorkItemLinkFilters FilterType=\"excludeAll\" /><ExternalLinkFilters FilterType=\"include\"><Filter LinkType=\"Build\" /><Filter LinkType=\"Integrated in build\" /><Filter LinkType=\"Pull Request\" /><Filter LinkType=\"Branch\" /><Filter LinkType=\"Fixed in Commit\" /><Filter LinkType=\"Fixed in Changeset\" /><Filter LinkType=\"Source Code File\" /><Filter LinkType=\"Found in build\" /><Filter LinkType=\"GitHub Pull Request\" /><Filter LinkType=\"GitHub Commit\" /><Filter LinkType=\"GitHub Branch\" /></ExternalLinkFilters><LinkColumns><LinkColumn RefName=\"System.Id\" /><LinkColumn RefName=\"System.Title\" /><LinkColumn LinkAttribute=\"System.Links.Comment\" /></LinkColumns></LinksControlOptions></Control></Column></Group><Group Label=\"Related Work\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Related Work\" Type=\"LinksControl\" Margin=\"(0,0,0,10)\"><LinksControlOptions><WorkItemLinkFilters FilterType=\"include\"><Filter LinkType=\"System.LinkTypes.Duplicate\" /><Filter LinkType=\"System.LinkTypes.Hierarchy\" /><Filter LinkType=\"Microsoft.VSTS.Common.TestedBy\" /><Filter LinkType=\"System.LinkTypes.Dependency\" /><Filter LinkType=\"System.LinkTypes.Related\" /></WorkItemLinkFilters><ExternalLinkFilters FilterType=\"include\"><Filter LinkType=\"GitHub Issue\" /></ExternalLinkFilters><LinkColumns><LinkColumn RefName=\"System.Id\" /><LinkColumn RefName=\"System.Title\" /><LinkColumn RefName=\"System.AssignedTo\" /><LinkColumn RefName=\"System.WorkItemType\" /><LinkColumn RefName=\"System.State\" /><LinkColumn RefName=\"System.ChangedDate\" /><LinkColumn LinkAttribute=\"System.Links.Comment\" /></LinkColumns></LinksControlOptions></Control></Column></Group></Column></Group></Column></Group></Column></Group></Tab><Tab Label=\"Experience Details\"><Group><Column PercentWidth=\"67\"><Group><Column PercentWidth=\"100\"><Group Label=\"Experience\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Experience\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Content and Taxonomy \"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Taxonomy\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"User Roles\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.UserRoles\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Channels\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Channels\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Legislation\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Legislation\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Policies\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Policies\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Process\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Process\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Procedure\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Procedure\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column><Column PercentWidth=\"33\"><Group Margin=\"(20,0,0,0)\"><Column PercentWidth=\"33\"><Group><Column PercentWidth=\"100\"><Group Label=\"Integrity\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Integrity\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Quality\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Quality\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Inclusivity\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Inclusivity\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Measurement\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Measurement\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Performance\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Performance\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Organization Impacts\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.OrganizationImpacts\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Business Continuity\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.BusinessContinuity\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Finance\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Finance\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column></Group></Column></Group></Tab><Tab Label=\"Technical Details\"><Group><Column PercentWidth=\"67\"><Group><Column PercentWidth=\"100\"><Group Label=\"Solution\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Solution\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Data Impacted\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.DataImpacted\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Volumetrics\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Volumetrics\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Privacy\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Privacy\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Security\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Security\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Audit\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.Audit\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column><Column PercentWidth=\"33\"><Group Margin=\"(20,0,0,0)\"><Column PercentWidth=\"33\"><Group><Column PercentWidth=\"100\"><Group Label=\"System Interfaces\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.SystemInterfaces\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Deployment\"><Column PercentWidth=\"100\"><Control Label=\"Deployment Tag\" LabelPosition=\"Top\" FieldName=\"Custom.DeploymentTag\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Release Considerations\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.ReleaseConsiderations\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group><Group Label=\"Change Management Considerations\"><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"Custom.ChangeManagementConsiderations\" Type=\"HtmlFieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column></Group></Column></Group></Tab><Tab Label=\"Security Controls\"><Group><Column PercentWidth=\"100\"><Group><Column PercentWidth=\"100\"><Group Label=\"Details (For Security Team Only)\"><Column PercentWidth=\"100\"><Control Label=\"Security Control State\" LabelPosition=\"Top\" FieldName=\"Custom.SecurityControlState\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Security Control Class\" LabelPosition=\"Top\" FieldName=\"Custom.SecurityControlClass\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /><Control Label=\"Security Control Inheritance\" LabelPosition=\"Top\" FieldName=\"Custom.SecurityControlInheritance\" Type=\"FieldControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column></Group></Tab><Tab Label=\"History\"><Group><Column PercentWidth=\"100\"><Group><Column PercentWidth=\"100\"><Group><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" FieldName=\"System.History\" Type=\"WorkItemLogControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column></Group></Tab><Tab Label=\"Links\"><Group><Column PercentWidth=\"100\"><Group><Column PercentWidth=\"100\"><Group><Column PercentWidth=\"100\"><Control Label=\"\" LabelPosition=\"Top\" Type=\"LinksControl\" Margin=\"(0,0,0,10)\"><LinksControlOptions><LinkColumns><LinkColumn RefName=\"System.Id\" /><LinkColumn RefName=\"System.Title\" /><LinkColumn RefName=\"System.AssignedTo\" /><LinkColumn RefName=\"System.WorkItemType\" /><LinkColumn RefName=\"System.State\" /><LinkColumn RefName=\"System.ChangedDate\" /><LinkColumn LinkAttribute=\"System.Links.Comment\" /></LinkColumns></LinksControlOptions></Control></Column></Group></Column></Group></Column></Group></Tab><Tab Label=\"Attachments\"><Group><Column PercentWidth=\"100\"><Group><Column PercentWidth=\"100\"><Group><Column PercentWidth=\"100\"><Control Label=\"Attachments\" LabelPosition=\"Top\" Type=\"AttachmentsControl\" Margin=\"(0,0,0,10)\" /></Column></Group></Column></Group></Column></Group></Tab></TabGroup></Layout></FORM>",
    "fields": [
        {
            "defaultValue": null,
            "helpText": "The iteration within which this bug will be fixed",
            "alwaysRequired": false,
            "referenceName": "System.IterationPath",
            "name": "Iteration Path",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationPath"
        },
        {
            "defaultValue": null,
            "alwaysRequired": true,
            "referenceName": "System.IterationId",
            "name": "Iteration ID",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationId"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.ExternalLinkCount",
            "name": "External Link Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.ExternalLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel7",
            "name": "Iteration Level 7",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel7"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel6",
            "name": "Iteration Level 6",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel6"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel5",
            "name": "Iteration Level 5",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel5"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel4",
            "name": "Iteration Level 4",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel4"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel3",
            "name": "Iteration Level 3",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel3"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel2",
            "name": "Iteration Level 2",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel2"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel1",
            "name": "Iteration Level 1",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel1"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel7",
            "name": "Area Level 7",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel7"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel6",
            "name": "Area Level 6",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel6"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel5",
            "name": "Area Level 5",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel5"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel4",
            "name": "Area Level 4",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel4"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel3",
            "name": "Area Level 3",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel3"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel2",
            "name": "Area Level 2",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel2"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel1",
            "name": "Area Level 1",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel1"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.TeamProject",
            "name": "Team Project",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.TeamProject"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Parent",
            "name": "Parent",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Parent"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.RemoteLinkCount",
            "name": "Remote Link Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.RemoteLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.CommentCount",
            "name": "Comment Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.CommentCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.HyperLinkCount",
            "name": "Hyperlink Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.HyperLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AttachedFileCount",
            "name": "Attached File Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AttachedFileCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.NodeName",
            "name": "Node Name",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.NodeName"
        },
        {
            "defaultValue": null,
            "helpText": "The area of the product with which this bug is associated",
            "alwaysRequired": false,
            "referenceName": "System.AreaPath",
            "name": "Area Path",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaPath"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.RevisedDate",
            "name": "Revised Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.RevisedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.ChangedDate",
            "name": "Changed Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.ChangedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Id",
            "name": "ID",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Id"
        },
        {
            "defaultValue": null,
            "alwaysRequired": true,
            "referenceName": "System.AreaId",
            "name": "Area ID",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaId"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AuthorizedAs",
            "name": "Authorized As",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AuthorizedAs"
        },
        {
            "defaultValue": null,
            "helpText": "Stories affected and how",
            "alwaysRequired": true,
            "referenceName": "System.Title",
            "name": "Title",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Title"
        },
        {
            "defaultValue": "New",
            "helpText": "New = for triage; Active = not yet fixed; Resolved = fixed not yet verified; Closed = fix verified.",
            "alwaysRequired": true,
            "referenceName": "System.State",
            "name": "State",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.State"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AuthorizedDate",
            "name": "Authorized Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AuthorizedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Watermark",
            "name": "Watermark",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Watermark"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Rev",
            "name": "Rev",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Rev"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.ChangedBy",
            "name": "Changed By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.ChangedBy"
        },
        {
            "defaultValue": null,
            "helpText": "The reason why the bug is in the current state",
            "alwaysRequired": false,
            "referenceName": "System.Reason",
            "name": "Reason",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Reason"
        },
        {
            "defaultValue": null,
            "helpText": "The person currently working on this bug",
            "alwaysRequired": false,
            "referenceName": "System.AssignedTo",
            "name": "Assigned To",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AssignedTo"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.WorkItemType",
            "name": "Work Item Type",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.WorkItemType"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.CreatedDate",
            "name": "Created Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.CreatedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.CreatedBy",
            "name": "Created By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.CreatedBy"
        },
        {
            "defaultValue": null,
            "helpText": "Description or acceptance criteria for this epic to be considered complete",
            "alwaysRequired": true,
            "referenceName": "System.Description",
            "name": "Description",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Description"
        },
        {
            "defaultValue": null,
            "helpText": "Discussion thread plus automatic record of changes",
            "alwaysRequired": false,
            "referenceName": "System.History",
            "name": "History",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.History"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.RelatedLinkCount",
            "name": "Related Link Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.RelatedLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Tags",
            "name": "Tags",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Tags"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.BoardColumn",
            "name": "Board Column",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.BoardColumn"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.BoardColumnDone",
            "name": "Board Column Done",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.BoardColumnDone"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.BoardLane",
            "name": "Board Lane",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.BoardLane"
        },
        {
            "defaultValue": null,
            "helpText": "The size of work estimated for fixing the bug",
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Scheduling.StoryPoints",
            "name": "Story Points",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Scheduling.StoryPoints"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.StateChangeDate",
            "name": "State Change Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.StateChangeDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ActivatedDate",
            "name": "Activated Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ActivatedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ActivatedBy",
            "name": "Activated By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ActivatedBy"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ResolvedDate",
            "name": "Resolved Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ResolvedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ResolvedBy",
            "name": "Resolved By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ResolvedBy"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ClosedDate",
            "name": "Closed Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ClosedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ClosedBy",
            "name": "Closed By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ClosedBy"
        },
        {
            "defaultValue": null,
            "helpText": "The target date for completing the epic",
            "alwaysRequired": true,
            "referenceName": "Microsoft.VSTS.Scheduling.TargetDate",
            "name": "Target Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Scheduling.TargetDate"
        },
        {
            "defaultValue": null,
            "helpText": "The date to start the task",
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Scheduling.StartDate",
            "name": "Start Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Scheduling.StartDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.AcceptanceCriteria",
            "name": "Acceptance Criteria",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.AcceptanceCriteria"
        },
        {
            "defaultValue": null,
            "helpText": "List any assumptions made in defining the work and may need to be validated as part of the work.",
            "alwaysRequired": false,
            "referenceName": "Custom.Assumptions",
            "name": "Assumptions",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Assumptions"
        },
        {
            "defaultValue": null,
            "helpText": "Identify the data that is read, created, updated, or deleted in this work item.Also identify any data migration needs for this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.DataImpacted",
            "name": "Data Impacted",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.DataImpacted"
        },
        {
            "defaultValue": null,
            "helpText": "Add links to associated Interface Product Features in this field. Type in \"#\", followed by the ADO Feature ID, for ADO to automatically create the Feature link in the links tab.",
            "alwaysRequired": false,
            "referenceName": "Custom.SystemInterfaces",
            "name": "System Interfaces",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SystemInterfaces"
        },
        {
            "defaultValue": null,
            "helpText": "Optionally reference related legislation.",
            "alwaysRequired": false,
            "referenceName": "Custom.Legislation",
            "name": "Legislation",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Legislation"
        },
        {
            "defaultValue": null,
            "helpText": "Optionally reference related policies.",
            "alwaysRequired": false,
            "referenceName": "Custom.Policies",
            "name": "Policies",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Policies"
        },
        {
            "defaultValue": null,
            "helpText": "Describe and link to the future-state Process Maps per the Design Ops standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Process",
            "name": "Process",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Process"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the future state user experience design. Include links to User Research for validation;  to design standards and accelerators for the channel targeted with the design; as well as any visuals or other documents to support understanding.",
            "alwaysRequired": false,
            "referenceName": "Custom.Experience",
            "name": "Experience",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Experience"
        },
        {
            "defaultValue": null,
            "helpText": "Describe any inclusivity considerations for this work item (i.e. disadvantaged/underserved communities)",
            "alwaysRequired": false,
            "referenceName": "Custom.Inclusivity",
            "name": "Inclusivity",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Inclusivity"
        },
        {
            "defaultValue": null,
            "helpText": "Describe and link to the future-state Procedures impacted by this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Procedure",
            "name": "Procedure",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Procedure"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the data and interaction volumes (quantity per time period) related to this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Volumetrics",
            "name": "Volumetrics",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Volumetrics"
        },
        {
            "defaultValue": null,
            "helpText": "Identify the organization(s) that are impacted, the degree to which they are impacted, and how they are impacted.",
            "alwaysRequired": false,
            "referenceName": "Custom.OrganizationImpacts",
            "name": "Organization Impacts",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.OrganizationImpacts"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Quality design that applies to this work item. Refer to the Quality Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Quality",
            "name": "Quality",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Quality"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the measurement design.",
            "alwaysRequired": false,
            "referenceName": "Custom.Measurement",
            "name": "Measurement",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Measurement"
        },
        {
            "defaultValue": null,
            "helpText": "Describe any financial design of this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Finance",
            "name": "Finance",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Finance"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the required performance design characteristics.",
            "alwaysRequired": false,
            "referenceName": "Custom.Performance",
            "name": "Performance",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Performance"
        },
        {
            "defaultValue": null,
            "helpText": "OOTB – No code, configuration, or data changes to Cúram OOTB || Configuration – Defining or editing Cúram configuration values || Extension – Additions to Cúram that enhance the baseline code || Customization – Creation of new Cúram components not provided",
            "alwaysRequired": false,
            "referenceName": "Custom.SolutionTypeCBD",
            "name": "Solution Type CBD",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SolutionTypeCBD"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Privacy design that applies to this work item. Refer to the Privacy Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Privacy",
            "name": "Privacy",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Privacy"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Security design that applies to this work item. Refer to the Security Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Security",
            "name": "Security",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Security"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the technical solution design. Provide links to solution diagrams and solution architecture with any implementation notes.",
            "alwaysRequired": false,
            "referenceName": "Custom.Solution",
            "name": "Solution",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Solution"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Audit design that applies to this work item. Refer to the applicable Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Audit",
            "name": "Audit",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Audit"
        },
        {
            "defaultValue": null,
            "helpText": "Capture any  considerations (e.g., EI Program Operations and Technical Operations) as part of this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.ReleaseConsiderations",
            "name": "Release Considerations",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ReleaseConsiderations"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Integrity Design that applies to this work item. Refer to the Integrity standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Integrity",
            "name": "Integrity",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Integrity"
        },
        {
            "defaultValue": null,
            "helpText": "Describe any content and their associated translations that applies to this work item (e.g., screen content, letters, error messages, etc). Refer to the applicable DesignOps and Data Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Taxonomy",
            "name": "Taxonomy",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Taxonomy"
        },
        {
            "defaultValue": null,
            "helpText": "Identify any groups or individuals with a vested interest in the work and specify their role in completing the work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Stakeholders",
            "name": "Stakeholders",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Stakeholders"
        },
        {
            "defaultValue": null,
            "helpText": "List the User Types/Roles/Groups from the inventory that are impacted by the experience delivered by this work item. Describe how each is impacted.",
            "alwaysRequired": false,
            "referenceName": "Custom.UserRoles",
            "name": "User Roles",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.UserRoles"
        },
        {
            "defaultValue": null,
            "helpText": "List the Channel(s) where the experiences will be delivered by this work item. Reference and link to the channel inventory and any additional qualifying information.",
            "alwaysRequired": false,
            "referenceName": "Custom.Channels",
            "name": "Channels",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Channels"
        },
        {
            "defaultValue": "0",
            "helpText": "Identifies the Feature as needing User Research",
            "alwaysRequired": true,
            "referenceName": "Custom.UserResearch",
            "name": "User Research",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.UserResearch"
        },
        {
            "defaultValue": null,
            "helpText": "Select the Release for this work.",
            "alwaysRequired": true,
            "referenceName": "Custom.ReleaseEI",
            "name": "Release EI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ReleaseEI"
        },
        {
            "defaultValue": null,
            "alwaysRequired": true,
            "referenceName": "Custom.PlannedPI",
            "name": "Planned PI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.PlannedPI"
        },
        {
            "defaultValue": "0",
            "alwaysRequired": true,
            "referenceName": "Custom.AreyouconfidentthisfeaturewillbedeliveredwithinthePI",
            "name": "Are you confident this feature will be delivered within the PI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.AreyouconfidentthisfeaturewillbedeliveredwithinthePI"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.EstimatedPercentageDone",
            "name": "Estimated Percentage Done",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.EstimatedPercentageDone"
        },
        {
            "defaultValue": null,
            "helpText": "Capture any requirements or design related to Business Continuity.",
            "alwaysRequired": false,
            "referenceName": "Custom.BusinessContinuity",
            "name": "Business Continuity",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.BusinessContinuity"
        },
        {
            "defaultValue": null,
            "helpText": "Capture any Change Mgmt considerations (e.g. knowledge management, communications, learning, feedback) as part of this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.ChangeManagementConsiderations",
            "name": "Change Management Considerations",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ChangeManagementConsiderations"
        },
        {
            "defaultValue": null,
            "helpText": "Sum the Story Points of the child User Stories and Activities and enter it here",
            "alwaysRequired": false,
            "referenceName": "Custom.ActualStoryPoints",
            "name": "Actual Story Points",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ActualStoryPoints"
        },
        {
            "defaultValue": null,
            "helpText": "Select the Channel(s)",
            "alwaysRequired": false,
            "referenceName": "Custom.ChannelsEI",
            "name": "Channels EI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ChannelsEI"
        },
        {
            "defaultValue": null,
            "helpText": "Brief explanation for why your team does not feel confident they can deliver this Feature in this PI",
            "alwaysRequired": false,
            "referenceName": "Custom.DeliveryConfidenceRationale",
            "name": "Delivery Confidence Rationale",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.DeliveryConfidenceRationale"
        },
        {
            "defaultValue": "0",
            "alwaysRequired": true,
            "referenceName": "Custom.FNUFlag",
            "name": "FNUFlag",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FNUFlag"
        },
        {
            "defaultValue": null,
            "helpText": "5. Dev. in progress & Pending Assessor Feedback Complete",
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlState",
            "name": "Security Control State",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlState"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlClass",
            "name": "Security Control Class",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlClass"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlInheritance",
            "name": "Security Control Inheritance",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlInheritance"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlOwners",
            "name": "Security Control Owners",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlOwners"
        },
        {
            "defaultValue": null,
            "helpText": "Updated Target Date",
            "alwaysRequired": false,
            "referenceName": "Custom.UpdatedTargetDate",
            "name": "Updated Target Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.UpdatedTargetDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.DeploymentTag",
            "name": "Deployment Tag",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.DeploymentTag"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SIScopeChangeReasoning",
            "name": "SI Scope Change Reasoning",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SIScopeChangeReasoning"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SIScopeChanged",
            "name": "SI Scope Changed",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SIScopeChanged"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureBoundaries",
            "name": "Feature Boundaries",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureBoundaries"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.RelevantContext",
            "name": "Relevant Context",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.RelevantContext"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.Outcomes",
            "name": "Outcomes",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Outcomes"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.PainPoints",
            "name": "Pain Points",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.PainPoints"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureType",
            "name": "Feature Type",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureType"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureCategory",
            "name": "Feature Category",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureCategory"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureStakeholders",
            "name": "Feature Stakeholders",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureStakeholders"
        },
        {
            "defaultValue": null,
            "helpText": "Work first on items with lower-valued stack rank. Set in triage.",
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.StackRank",
            "name": "Stack Rank",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.StackRank"
        }
    ],
    "fieldInstances": [
        {
            "defaultValue": null,
            "helpText": "The iteration within which this bug will be fixed",
            "alwaysRequired": false,
            "referenceName": "System.IterationPath",
            "name": "Iteration Path",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationPath"
        },
        {
            "defaultValue": null,
            "alwaysRequired": true,
            "referenceName": "System.IterationId",
            "name": "Iteration ID",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationId"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.ExternalLinkCount",
            "name": "External Link Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.ExternalLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel7",
            "name": "Iteration Level 7",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel7"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel6",
            "name": "Iteration Level 6",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel6"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel5",
            "name": "Iteration Level 5",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel5"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel4",
            "name": "Iteration Level 4",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel4"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel3",
            "name": "Iteration Level 3",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel3"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel2",
            "name": "Iteration Level 2",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel2"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.IterationLevel1",
            "name": "Iteration Level 1",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.IterationLevel1"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel7",
            "name": "Area Level 7",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel7"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel6",
            "name": "Area Level 6",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel6"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel5",
            "name": "Area Level 5",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel5"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel4",
            "name": "Area Level 4",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel4"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel3",
            "name": "Area Level 3",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel3"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel2",
            "name": "Area Level 2",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel2"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AreaLevel1",
            "name": "Area Level 1",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaLevel1"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.TeamProject",
            "name": "Team Project",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.TeamProject"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Parent",
            "name": "Parent",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Parent"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.RemoteLinkCount",
            "name": "Remote Link Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.RemoteLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.CommentCount",
            "name": "Comment Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.CommentCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.HyperLinkCount",
            "name": "Hyperlink Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.HyperLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AttachedFileCount",
            "name": "Attached File Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AttachedFileCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.NodeName",
            "name": "Node Name",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.NodeName"
        },
        {
            "defaultValue": null,
            "helpText": "The area of the product with which this bug is associated",
            "alwaysRequired": false,
            "referenceName": "System.AreaPath",
            "name": "Area Path",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaPath"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.RevisedDate",
            "name": "Revised Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.RevisedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.ChangedDate",
            "name": "Changed Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.ChangedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Id",
            "name": "ID",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Id"
        },
        {
            "defaultValue": null,
            "alwaysRequired": true,
            "referenceName": "System.AreaId",
            "name": "Area ID",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AreaId"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AuthorizedAs",
            "name": "Authorized As",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AuthorizedAs"
        },
        {
            "defaultValue": null,
            "helpText": "Stories affected and how",
            "alwaysRequired": true,
            "referenceName": "System.Title",
            "name": "Title",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Title"
        },
        {
            "defaultValue": "New",
            "helpText": "New = for triage; Active = not yet fixed; Resolved = fixed not yet verified; Closed = fix verified.",
            "alwaysRequired": true,
            "referenceName": "System.State",
            "name": "State",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.State"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.AuthorizedDate",
            "name": "Authorized Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AuthorizedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Watermark",
            "name": "Watermark",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Watermark"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Rev",
            "name": "Rev",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Rev"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.ChangedBy",
            "name": "Changed By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.ChangedBy"
        },
        {
            "defaultValue": null,
            "helpText": "The reason why the bug is in the current state",
            "alwaysRequired": false,
            "referenceName": "System.Reason",
            "name": "Reason",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Reason"
        },
        {
            "defaultValue": null,
            "helpText": "The person currently working on this bug",
            "alwaysRequired": false,
            "referenceName": "System.AssignedTo",
            "name": "Assigned To",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.AssignedTo"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.WorkItemType",
            "name": "Work Item Type",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.WorkItemType"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.CreatedDate",
            "name": "Created Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.CreatedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.CreatedBy",
            "name": "Created By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.CreatedBy"
        },
        {
            "defaultValue": null,
            "helpText": "Description or acceptance criteria for this epic to be considered complete",
            "alwaysRequired": true,
            "referenceName": "System.Description",
            "name": "Description",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Description"
        },
        {
            "defaultValue": null,
            "helpText": "Discussion thread plus automatic record of changes",
            "alwaysRequired": false,
            "referenceName": "System.History",
            "name": "History",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.History"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.RelatedLinkCount",
            "name": "Related Link Count",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.RelatedLinkCount"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.Tags",
            "name": "Tags",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.Tags"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.BoardColumn",
            "name": "Board Column",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.BoardColumn"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.BoardColumnDone",
            "name": "Board Column Done",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.BoardColumnDone"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "System.BoardLane",
            "name": "Board Lane",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/System.BoardLane"
        },
        {
            "defaultValue": null,
            "helpText": "The size of work estimated for fixing the bug",
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Scheduling.StoryPoints",
            "name": "Story Points",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Scheduling.StoryPoints"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.StateChangeDate",
            "name": "State Change Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.StateChangeDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ActivatedDate",
            "name": "Activated Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ActivatedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ActivatedBy",
            "name": "Activated By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ActivatedBy"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ResolvedDate",
            "name": "Resolved Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ResolvedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ResolvedBy",
            "name": "Resolved By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ResolvedBy"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ClosedDate",
            "name": "Closed Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ClosedDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.ClosedBy",
            "name": "Closed By",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.ClosedBy"
        },
        {
            "defaultValue": null,
            "helpText": "The target date for completing the epic",
            "alwaysRequired": true,
            "referenceName": "Microsoft.VSTS.Scheduling.TargetDate",
            "name": "Target Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Scheduling.TargetDate"
        },
        {
            "defaultValue": null,
            "helpText": "The date to start the task",
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Scheduling.StartDate",
            "name": "Start Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Scheduling.StartDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.AcceptanceCriteria",
            "name": "Acceptance Criteria",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.AcceptanceCriteria"
        },
        {
            "defaultValue": null,
            "helpText": "List any assumptions made in defining the work and may need to be validated as part of the work.",
            "alwaysRequired": false,
            "referenceName": "Custom.Assumptions",
            "name": "Assumptions",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Assumptions"
        },
        {
            "defaultValue": null,
            "helpText": "Identify the data that is read, created, updated, or deleted in this work item.Also identify any data migration needs for this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.DataImpacted",
            "name": "Data Impacted",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.DataImpacted"
        },
        {
            "defaultValue": null,
            "helpText": "Add links to associated Interface Product Features in this field. Type in \"#\", followed by the ADO Feature ID, for ADO to automatically create the Feature link in the links tab.",
            "alwaysRequired": false,
            "referenceName": "Custom.SystemInterfaces",
            "name": "System Interfaces",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SystemInterfaces"
        },
        {
            "defaultValue": null,
            "helpText": "Optionally reference related legislation.",
            "alwaysRequired": false,
            "referenceName": "Custom.Legislation",
            "name": "Legislation",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Legislation"
        },
        {
            "defaultValue": null,
            "helpText": "Optionally reference related policies.",
            "alwaysRequired": false,
            "referenceName": "Custom.Policies",
            "name": "Policies",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Policies"
        },
        {
            "defaultValue": null,
            "helpText": "Describe and link to the future-state Process Maps per the Design Ops standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Process",
            "name": "Process",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Process"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the future state user experience design. Include links to User Research for validation;  to design standards and accelerators for the channel targeted with the design; as well as any visuals or other documents to support understanding.",
            "alwaysRequired": false,
            "referenceName": "Custom.Experience",
            "name": "Experience",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Experience"
        },
        {
            "defaultValue": null,
            "helpText": "Describe any inclusivity considerations for this work item (i.e. disadvantaged/underserved communities)",
            "alwaysRequired": false,
            "referenceName": "Custom.Inclusivity",
            "name": "Inclusivity",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Inclusivity"
        },
        {
            "defaultValue": null,
            "helpText": "Describe and link to the future-state Procedures impacted by this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Procedure",
            "name": "Procedure",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Procedure"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the data and interaction volumes (quantity per time period) related to this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Volumetrics",
            "name": "Volumetrics",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Volumetrics"
        },
        {
            "defaultValue": null,
            "helpText": "Identify the organization(s) that are impacted, the degree to which they are impacted, and how they are impacted.",
            "alwaysRequired": false,
            "referenceName": "Custom.OrganizationImpacts",
            "name": "Organization Impacts",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.OrganizationImpacts"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Quality design that applies to this work item. Refer to the Quality Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Quality",
            "name": "Quality",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Quality"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the measurement design.",
            "alwaysRequired": false,
            "referenceName": "Custom.Measurement",
            "name": "Measurement",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Measurement"
        },
        {
            "defaultValue": null,
            "helpText": "Describe any financial design of this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Finance",
            "name": "Finance",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Finance"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the required performance design characteristics.",
            "alwaysRequired": false,
            "referenceName": "Custom.Performance",
            "name": "Performance",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Performance"
        },
        {
            "defaultValue": null,
            "helpText": "OOTB – No code, configuration, or data changes to Cúram OOTB || Configuration – Defining or editing Cúram configuration values || Extension – Additions to Cúram that enhance the baseline code || Customization – Creation of new Cúram components not provided",
            "alwaysRequired": false,
            "referenceName": "Custom.SolutionTypeCBD",
            "name": "Solution Type CBD",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SolutionTypeCBD"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Privacy design that applies to this work item. Refer to the Privacy Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Privacy",
            "name": "Privacy",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Privacy"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Security design that applies to this work item. Refer to the Security Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Security",
            "name": "Security",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Security"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the technical solution design. Provide links to solution diagrams and solution architecture with any implementation notes.",
            "alwaysRequired": false,
            "referenceName": "Custom.Solution",
            "name": "Solution",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Solution"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Audit design that applies to this work item. Refer to the applicable Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Audit",
            "name": "Audit",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Audit"
        },
        {
            "defaultValue": null,
            "helpText": "Capture any  considerations (e.g., EI Program Operations and Technical Operations) as part of this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.ReleaseConsiderations",
            "name": "Release Considerations",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ReleaseConsiderations"
        },
        {
            "defaultValue": null,
            "helpText": "Describe the Integrity Design that applies to this work item. Refer to the Integrity standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Integrity",
            "name": "Integrity",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Integrity"
        },
        {
            "defaultValue": null,
            "helpText": "Describe any content and their associated translations that applies to this work item (e.g., screen content, letters, error messages, etc). Refer to the applicable DesignOps and Data Standards.",
            "alwaysRequired": false,
            "referenceName": "Custom.Taxonomy",
            "name": "Taxonomy",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Taxonomy"
        },
        {
            "defaultValue": null,
            "helpText": "Identify any groups or individuals with a vested interest in the work and specify their role in completing the work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.Stakeholders",
            "name": "Stakeholders",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Stakeholders"
        },
        {
            "defaultValue": null,
            "helpText": "List the User Types/Roles/Groups from the inventory that are impacted by the experience delivered by this work item. Describe how each is impacted.",
            "alwaysRequired": false,
            "referenceName": "Custom.UserRoles",
            "name": "User Roles",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.UserRoles"
        },
        {
            "defaultValue": null,
            "helpText": "List the Channel(s) where the experiences will be delivered by this work item. Reference and link to the channel inventory and any additional qualifying information.",
            "alwaysRequired": false,
            "referenceName": "Custom.Channels",
            "name": "Channels",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Channels"
        },
        {
            "defaultValue": "0",
            "helpText": "Identifies the Feature as needing User Research",
            "alwaysRequired": true,
            "referenceName": "Custom.UserResearch",
            "name": "User Research",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.UserResearch"
        },
        {
            "defaultValue": null,
            "helpText": "Select the Release for this work.",
            "alwaysRequired": true,
            "referenceName": "Custom.ReleaseEI",
            "name": "Release EI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ReleaseEI"
        },
        {
            "defaultValue": null,
            "alwaysRequired": true,
            "referenceName": "Custom.PlannedPI",
            "name": "Planned PI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.PlannedPI"
        },
        {
            "defaultValue": "0",
            "alwaysRequired": true,
            "referenceName": "Custom.AreyouconfidentthisfeaturewillbedeliveredwithinthePI",
            "name": "Are you confident this feature will be delivered within the PI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.AreyouconfidentthisfeaturewillbedeliveredwithinthePI"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.EstimatedPercentageDone",
            "name": "Estimated Percentage Done",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.EstimatedPercentageDone"
        },
        {
            "defaultValue": null,
            "helpText": "Capture any requirements or design related to Business Continuity.",
            "alwaysRequired": false,
            "referenceName": "Custom.BusinessContinuity",
            "name": "Business Continuity",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.BusinessContinuity"
        },
        {
            "defaultValue": null,
            "helpText": "Capture any Change Mgmt considerations (e.g. knowledge management, communications, learning, feedback) as part of this work item.",
            "alwaysRequired": false,
            "referenceName": "Custom.ChangeManagementConsiderations",
            "name": "Change Management Considerations",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ChangeManagementConsiderations"
        },
        {
            "defaultValue": null,
            "helpText": "Sum the Story Points of the child User Stories and Activities and enter it here",
            "alwaysRequired": false,
            "referenceName": "Custom.ActualStoryPoints",
            "name": "Actual Story Points",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ActualStoryPoints"
        },
        {
            "defaultValue": null,
            "helpText": "Select the Channel(s)",
            "alwaysRequired": false,
            "referenceName": "Custom.ChannelsEI",
            "name": "Channels EI",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.ChannelsEI"
        },
        {
            "defaultValue": null,
            "helpText": "Brief explanation for why your team does not feel confident they can deliver this Feature in this PI",
            "alwaysRequired": false,
            "referenceName": "Custom.DeliveryConfidenceRationale",
            "name": "Delivery Confidence Rationale",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.DeliveryConfidenceRationale"
        },
        {
            "defaultValue": "0",
            "alwaysRequired": true,
            "referenceName": "Custom.FNUFlag",
            "name": "FNUFlag",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FNUFlag"
        },
        {
            "defaultValue": null,
            "helpText": "5. Dev. in progress & Pending Assessor Feedback Complete",
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlState",
            "name": "Security Control State",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlState"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlClass",
            "name": "Security Control Class",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlClass"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlInheritance",
            "name": "Security Control Inheritance",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlInheritance"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SecurityControlOwners",
            "name": "Security Control Owners",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SecurityControlOwners"
        },
        {
            "defaultValue": null,
            "helpText": "Updated Target Date",
            "alwaysRequired": false,
            "referenceName": "Custom.UpdatedTargetDate",
            "name": "Updated Target Date",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.UpdatedTargetDate"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.DeploymentTag",
            "name": "Deployment Tag",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.DeploymentTag"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SIScopeChangeReasoning",
            "name": "SI Scope Change Reasoning",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SIScopeChangeReasoning"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.SIScopeChanged",
            "name": "SI Scope Changed",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.SIScopeChanged"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureBoundaries",
            "name": "Feature Boundaries",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureBoundaries"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.RelevantContext",
            "name": "Relevant Context",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.RelevantContext"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.Outcomes",
            "name": "Outcomes",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.Outcomes"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.PainPoints",
            "name": "Pain Points",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.PainPoints"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureType",
            "name": "Feature Type",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureType"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureCategory",
            "name": "Feature Category",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureCategory"
        },
        {
            "defaultValue": null,
            "alwaysRequired": false,
            "referenceName": "Custom.FeatureStakeholders",
            "name": "Feature Stakeholders",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Custom.FeatureStakeholders"
        },
        {
            "defaultValue": null,
            "helpText": "Work first on items with lower-valued stack rank. Set in triage.",
            "alwaysRequired": false,
            "referenceName": "Microsoft.VSTS.Common.StackRank",
            "name": "Stack Rank",
            "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/fields/Microsoft.VSTS.Common.StackRank"
        }
    ],
    "transitions": {
        "": [
            {
                "to": "New",
                "actions": null
            }
        ],
        "New": [
            {
                "to": "New",
                "actions": null
            },
            {
                "to": "Active",
                "actions": null
            },
            {
                "to": "Closed",
                "actions": null
            }
        ],
        "Active": [
            {
                "to": "New",
                "actions": null
            },
            {
                "to": "Active",
                "actions": null
            },
            {
                "to": "Closed",
                "actions": null
            }
        ],
        "Closed": [
            {
                "to": "New",
                "actions": null
            },
            {
                "to": "Active",
                "actions": null
            },
            {
                "to": "Closed",
                "actions": null
            }
        ]
    },
    "states": [
        {
            "name": "New",
            "color": "b2b2b2",
            "category": "Proposed"
        },
        {
            "name": "Active",
            "color": "007acc",
            "category": "InProgress"
        },
        {
            "name": "Closed",
            "color": "339933",
            "category": "Completed"
        }
    ],
    "_links": {
        "self": {
            "href": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/workItemTypes/Product%20Feature"
        }
    },
    "url": "https://dev.azure.com/VP-BD/d35a45fc-2d8e-46ef-ade8-0059e0901f54/_apis/wit/workItemTypes/Product%20Feature"
}
*/