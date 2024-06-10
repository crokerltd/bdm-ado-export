// import { groupAndSendToAssignees } from "./adoEmail";
import { AdoTest } from "./AdoTest";
import { AdoWit } from "./AdoWit";
import { BDMTestPlan } from "./bdm";
import { writeFile } from "./utils";
import { Feature } from "./workitems/Feature";

const options = {
  daysSinceUpdated: 7
};

export async function exportFeatures() {
  const features = (await Feature.get(`
    [System.State] <> "Removed"
    AND (
      [System.IterationPath] UNDER 'BDC\\OAS\\R1'
      OR [System.IterationPath] UNDER 'BDC\\OAS\\R2'
    )`));
  //const feature = await Feature.getById(123372);
  for (const feature of features.slice(0, 10)) {
    await feature.getComments();
    await writeFile(JSON.stringify(feature), `out/feature-${feature.id}.json`);
    await writeFile(await feature.render(), `out/feature-${feature.id}.html`);
  }
}

export async function exportStatusReport() {
  const token = 'rjxgfxil5cm2brncpwyumakackfdlughadcu3zfl2tz4fgu4gmsq';
  const adoTest = await AdoTest.getInstance();
  const adoWit = await AdoWit.getInstance();
  // const adoTest = await AdoTest.getInstance('DevOps%20Demo', 'mcroker', token);
  // const plans = await adoTest.getTestPlans();
  // writeFile(JSON.stringify(plans.map(i => ({ id: i.id, name: i.name }))), "out/plans.json");
  const dailyResults = await adoTest.getTestResultsDaily(BDMTestPlan.r2);
  writeFile(JSON.stringify(dailyResults), "out/daily-r2.json");
  const dailyResultsAT = await adoTest.getTestResultsDaily(BDMTestPlan.r2accessibility);
  writeFile(JSON.stringify(dailyResultsAT), "out/daily-access.json");
  const bugTrend = await adoWit.getWorkItemSnapshot()
  writeFile(JSON.stringify(bugTrend), "out/bugTrend.json");
}

/**
 * Main function
 */
(async () => {
  await exportStatusReport();
})();

