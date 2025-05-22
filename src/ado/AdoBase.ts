import * as adoApi from 'azure-devops-node-api';
import { getEnv } from '../utils/utils';
import fetch from 'node-fetch';
// import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";

export abstract class AdoBase {

    private webApi: undefined | adoApi.WebApi;

    constructor(
        readonly orgId: string = getEnv("ADO_API_ORG"),
        protected readonly token: string = getEnv("ADO_API_TOKEN")
    ) {
        // do nothing
    }

    protected async getWebApi(): Promise<adoApi.WebApi> {
        if (this.webApi === undefined) {
            let authHandler = adoApi.getPersonalAccessTokenHandler(this.token);
            this.webApi = new adoApi.WebApi(`https://dev.azure.com/${this.orgId}`, authHandler, undefined);
        }
        return this.webApi;
    }

    protected async execOData(path: string, projectId:string, query: string, ver: string = 'v4.0-preview'): Promise<any> {

        const encodeURIComponentStrict = (str: string) =>
            encodeURIComponent(str).replace(
                /[!'()*]/g,
                (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
            );

        const encodedUrl = encodeURI(path) + '?%24apply=' + encodeURIComponentStrict(query.trim().replace(/[ \n]+/g, '+')).replace(/%2B/g, '+');

        const results = await fetch(
            `https://analytics.dev.azure.com/${this.orgId}/${projectId}/_odata/${ver}/${encodedUrl}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Basic ` + Buffer.from(`PAT:${this.token}`).toString('base64'),
                    'X-TFS-FedAuthRedirect': 'Suppress'
                }
            }
        );
        return results.json();
    }

}