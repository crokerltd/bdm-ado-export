import { WebApi } from 'azure-devops-node-api';
import { IWorkItemTrackingApi } from 'azure-devops-node-api/WorkItemTrackingApi';
import { SendMailBody, WorkItemErrorPolicy, WorkItemExpand } from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';
import * as adoApi from 'azure-devops-node-api';
import { chunkArray, getEnv } from './utils';
// import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";

export class AdoWit {

    private static instance: AdoWit;

    static getInstance() {
        if (!AdoWit.instance) {
            AdoWit.instance = new AdoWit();
        }
        return AdoWit.instance;
    }

    private webApi: undefined | adoApi.WebApi;
    private witClient: undefined | IWorkItemTrackingApi;

    private constructor(
        readonly projectId: string = getEnv("ADO_API_PROJECT")
    ) {
        // do nothing
    }

    async getAllTags(): Promise<any> {
        const witApi: IWorkItemTrackingApi = await this.getWitClient();
        const result = await witApi.getTags(this.projectId);
        return result.map(e => e.name);
    }

    async adoGetIdsFromWiql(query: string): Promise<number[]> {
        const witApi: IWorkItemTrackingApi = await this.getWitClient();
        // run wiql query
        const result = await witApi.queryByWiql({ query }, { projectId: this.projectId });
        return (result?.workItems || []).map(e => e.id).filter(e => e !== undefined) as number[];
    }

    /**
     * retrieve all work-items (optionally for a given date)
     * 
     * @param asOf (optional) date asOf which information is to be retrieved
     * @returns    Array of WorkItems
     */
    async getWorkItems(workItemIds: number[], fields?: string[], asOf?: Date): Promise<any> {
        // Map this into an array of number
        const batchedWorkItems = chunkArray(workItemIds, 200);

        const workItems: any[] = [];
        await Promise.all(batchedWorkItems.map(async ids => {
            workItems.push(...await this.getWorkItemsBatch(ids, fields, asOf));
        }));
        return workItems;
    }

    async listWorkItemFields(workItemType: string) {
        const witApi: IWorkItemTrackingApi = await this.getWitClient();
        const fields = await witApi.getWorkItemTypeFieldsWithReferences(this.projectId, workItemType);
        return fields;
    }

    /**
     * Retrieve a batch of (200?) WorkItems, calls ADO and maps the response
     * 
     * @param ids  An array of (max 200) WorkItems to retrieve
     * @param asOf (optional) date asOf which information is to be retrieved
     * @returns    An array of expanded WorkItems
     */
    private async getWorkItemsBatch(ids: number[], fields?: string[], asOf?: Date): Promise<any> {
        const witClient = await this.getWitClient();
        try {
            const items = await witClient.getWorkItems(
                ids,
                fields,
                asOf,
                (fields !== undefined) ? undefined : WorkItemExpand.All,
                WorkItemErrorPolicy.Omit
            );
            return items.filter(e => e);
        } catch (e) {
            console.error(e);
        }
    }

    async getWorkItemComments(workItemId: number): Promise<any> {
        const witApi: IWorkItemTrackingApi = await this.getWitClient();
        return await witApi.getComments(this.projectId, workItemId);
    }

    async sendMail(message: SendMailBody) {
        const witApi: IWorkItemTrackingApi = await this.getWitClient();
        await witApi.sendMail(message, this.projectId);
    }

    private async getWitClient(): Promise<IWorkItemTrackingApi> {
        if (this.witClient === undefined) {
            if (this.webApi === undefined) {
                this.webApi = await this.getWebApi();
            }
            this.witClient = await this.webApi.getWorkItemTrackingApi();
        }
        return this.witClient;
    }

    private async getWebApi(serverUrl?: string): Promise<adoApi.WebApi> {
        if (this.webApi === undefined) {
            serverUrl = serverUrl || getEnv("ADO_API_URL");
            let token = getEnv("ADO_API_TOKEN");

            let authHandler = adoApi.getPersonalAccessTokenHandler(token);
            let option = undefined;

            this.webApi = new adoApi.WebApi(serverUrl, authHandler, option);
            // let connData: lim.ConnectionData = await vsts.connect();
            // console.log(`Hello ${connData.authenticatedUser?.providerDisplayName}`);
        }
        return this.webApi;
    }

}