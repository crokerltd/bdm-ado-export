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

    static getInstance(projectId?: string, orgId?: string, token?: string) {
        if (!AdoTest.instance) {
            AdoTest.instance = new AdoTest(projectId, orgId, token);
        }
        return AdoTest.instance;
    }

    private testResultsApi: undefined | ITestResultsApi;
    private testPlansApi: undefined | ITestPlanApi;

    private constructor(projectId?: string, orgId?: string, token?: string) {
        super(projectId, orgId, token);
    }

    async getTestResults(testRunId: number): Promise<TestCaseResult[]> {
        const testApi: ITestResultsApi = await this.getTestResultsApi();
        const results = await testApi.getTestResults(this.projectId, testRunId);
        return results;
    }

    async getTestRuns(planId: number): Promise<TestRun[]> {
        const testApi: ITestResultsApi = await this.getTestResultsApi();
        const runs = await testApi.getTestRuns(this.projectId, undefined, undefined, undefined, planId);
        testApi.getTestRunStatistics(this.projectId, planId);
        return runs;
    }

    async getTestRunSummaryByOutcome(planId: number): Promise<TestRunStatistic> {
        const testApi: ITestResultsApi = await this.getTestResultsApi();
        return await testApi.getTestRunSummaryByOutcome(this.projectId, planId);
    }

    async getTestResultsDaily(planId: number): Promise<any> {
        const result = await this.execOData('TestPointHistorySnapshot', `
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

    async getTestPlans(): Promise<TestPlan[]> {
        const testApi: ITestPlanApi = await this.getTestPlanApi();
        const runs: TestPlan[] = [];
        let page = await testApi.getTestPlans(this.projectId);
        page.forEach(i => runs.push(i));
        while (page.continuationToken) {
            page = await testApi.getTestPlans(this.projectId, page.continuationToken);
            page.forEach(i => runs.push(i));
        }
        return runs;
    }

    async getTestSuitesForPlan(planId: number): Promise<TestSuite[]> {
        const testApi: ITestPlanApi = await this.getTestPlanApi();
        const suites: TestSuite[] = [];
        let page = await testApi.getTestSuitesForPlan(this.projectId, planId, undefined);
        page.forEach(i => suites.push(i));
        while (page.continuationToken) {
            page = await testApi.getTestSuitesForPlan(this.projectId, planId, undefined, page.continuationToken);
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