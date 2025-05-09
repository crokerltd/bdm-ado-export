import { WebApi } from 'azure-devops-node-api';
import { IWorkItemTrackingApi } from 'azure-devops-node-api/WorkItemTrackingApi';
import { SendMailBody, WorkItemErrorPolicy, WorkItemExpand } from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';
import { chunkArray } from '../utils/utils';
import { AdoBase } from './AdoBase';
// import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";

export class AdoWit extends AdoBase {

    private static instance: AdoWit;

    static getInstance(projectId?: string, orgId?: string, token?: string) {
        if (!AdoWit.instance) {
            AdoWit.instance = new AdoWit(projectId, orgId, token);
        }
        return AdoWit.instance;
    }

    private witClient: undefined | IWorkItemTrackingApi;

    private constructor(projectId?: string, orgId?: string, token?: string) {
        super(projectId, orgId, token);
    }

    async getWorkItemIcons() {
        const witApi: IWorkItemTrackingApi = await this.getWitClient();
        const result = await witApi.getWorkItemIcons()
        console.log(result)    
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
        if (ids === null || ids === undefined) {
            throw new Error('ids must be defined');
        }
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

    async getWorkItemSnapshot(): Promise<any> {
        // const result = await this.execOData(`/WorkItemSnapshot?%24apply=filter%28+WorkItemType+eq+%27Bug%27+and+State+ne+%27Closed%27+and+startswith%28Iteration%2FIterationPath%2C%27BDC%5COAS%5CR2%27%29+and+DateValue+ge+2024-01-01Z+%29+%2Fgroupby%28+%28DateValue%29%2C+aggregate%28+%24count+as+Count%2C+cast%28State++eq+%27Active%27%2C+Edm.Int32%29+with+sum+as+Active%2C+cast%28State++eq+%27Blocked%27%2C+Edm.Int32%29+with+sum+as+Blocked%2C+cast%28State+eq+%27New%27%2C+Edm.Int32%29+with+sum+as+New%2C+cast%28State+eq+%27Resolved%27%2C+Edm.Int32%29+with+sum+as+Resolved+%29+%29`);
        const result = await this.execOData('WorkItemSnapshot', `
        filter(
            WorkItemType eq 'Bug'
            and State ne 'Closed'
            and startswith(Iteration/IterationPath,'BDC\\OAS\\R2')
            and DateValue ge 2024-01-01Z
            )
        /groupby(
            (DateValue),
            aggregate(
                $count as Count, 
                cast(State  eq 'Active', Edm.Int32) with sum as Active, 
                cast(State  eq 'Blocked', Edm.Int32) with sum as Blocked, 
                cast(State eq 'New', Edm.Int32) with sum as New, 
                cast(State eq 'Resolved', Edm.Int32) with sum as Resolved
                )
            )
        `);
        return result;
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
            const webApi: WebApi = await this.getWebApi();
            this.witClient = await webApi.getWorkItemTrackingApi();
        }
        return this.witClient;
    }

}