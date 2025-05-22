import { WebApi } from 'azure-devops-node-api';
import { AdoBase } from './AdoBase';
import { ITestResultsApi } from 'azure-devops-node-api/TestResultsApi';
import { TestCaseResult, TestRun, TestRunStatistic } from 'azure-devops-node-api/interfaces/TestInterfaces';
import { TestPlan, TestSuite } from 'azure-devops-node-api/interfaces/TestPlanInterfaces';
import { ITestPlanApi } from 'azure-devops-node-api/TestPlanApi';
// import buildQuery from 'odata-query'
// import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";

export class AdoTest extends AdoBase {

    private static instance: AdoTest;

    static getInstance(orgId?: string, token?: string) {
        if (!AdoTest.instance) {
            AdoTest.instance = new AdoTest(orgId, token);
        }
        return AdoTest.instance;
    }

    private testResultsApi: undefined | ITestResultsApi;
    private testPlansApi: undefined | ITestPlanApi;

    private constructor(orgId?: string, token?: string) {
        super(orgId, token);
    }

    async getTestResults(projectId: string, testRunId: number): Promise<TestCaseResult[]> {
        const testApi: ITestResultsApi = await this.getTestResultsApi();
        const results = await testApi.getTestResults(projectId, testRunId);
        return results;
    }

    async getTestRuns(projectId: string, planId: number): Promise<TestRun[]> {
        const testApi: ITestResultsApi = await this.getTestResultsApi();
        const runs = await testApi.getTestRuns(projectId, undefined, undefined, undefined, planId);
        testApi.getTestRunStatistics(projectId, planId);
        return runs;
    }

    async getTestRunSummaryByOutcome(projectId: string, planId: number): Promise<TestRunStatistic> {
        const testApi: ITestResultsApi = await this.getTestResultsApi();
        return await testApi.getTestRunSummaryByOutcome(projectId, planId);
    }

    async getTestResultsDaily(projectId: string, planId: number): Promise<any> {
        const result = await this.execOData(projectId, 'TestPointHistorySnapshot', `
            filter(DateSK ge 20240101 and TestSuite/TestPlanId eq ${planId})
            /groupby( 
                (DateSK),  
                aggregate( 
                    $count as TotalCount, 
                    cast(ResultOutcome  eq 'Passed', Edm.Int32) with sum as Passed, 
                    cast(ResultOutcome  eq 'Failed', Edm.Int32) with sum as Failed, 
                    cast(ResultOutcome eq 'Blocked', Edm.Int32) with sum as Blocked, 
                    cast(ResultOutcome eq 'NotApplicable', Edm.Int32) with sum as NotApplicable, 
                    cast(ResultOutcome eq 'None', Edm.Int32) with sum as NotExecuted,  
                    cast(ResultOutcome ne 'None', Edm.Int32) with sum as Executed 
                ) 
            )`);
        return result;
    }

    async getTestPlans(projectId: string): Promise<TestPlan[]> {
        const testApi: ITestPlanApi = await this.getTestPlanApi();
        const runs: TestPlan[] = [];
        let page = await testApi.getTestPlans(projectId);
        page.forEach(i => runs.push(i));
        while (page.continuationToken) {
            page = await testApi.getTestPlans(projectId, page.continuationToken);
            page.forEach(i => runs.push(i));
        }
        return runs;
    }

    async getTestSuitesForPlan(projectId: string, planId: number): Promise<TestSuite[]> {
        const testApi: ITestPlanApi = await this.getTestPlanApi();
        const suites: TestSuite[] = [];
        let page = await testApi.getTestSuitesForPlan(projectId, planId, undefined);
        page.forEach(i => suites.push(i));
        while (page.continuationToken) {
            page = await testApi.getTestSuitesForPlan(projectId, planId, undefined, page.continuationToken);
            page.forEach(i => suites.push(i));
        }
        return suites;
    }

    private async getTestResultsApi(): Promise<ITestResultsApi> {
        if (this.testResultsApi === undefined) {
            const webApi: WebApi = await this.getWebApi();
            this.testResultsApi = await webApi.getTestResultsApi();
        }
        return this.testResultsApi;
    }

    private async getTestPlanApi(): Promise<ITestPlanApi> {
        if (this.testPlansApi === undefined) {
            const webApi: WebApi = await this.getWebApi();
            this.testPlansApi = await webApi.getTestPlanApi();
        }
        return this.testPlansApi;
    }

}