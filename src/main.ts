// import { groupAndSendToAssignees } from "./adoEmail";
import { AdoWit } from "./AdoWit";
import { njk } from "./njk";
import { QueryList, QueryResults } from "./types";
import { writeFile } from "./utils";
import { Feature } from "./workitems/Feature";

const options = {
  daysSinceUpdated: 7
};

/**
 * Main function
 */
(async () => {
  // const adoWit = AdoWit.getInstance();
  // console.log(await adoWit.listWorkItemFields('Feature'));
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
})();

