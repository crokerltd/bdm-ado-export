import { writeFile } from "./utils";
import { njk } from "./njk";
import { WorkItemFactory } from "./workitems/WorkItemFactory";
import { Walker } from "./Walker";
import { WorkItem } from "./workitems/types";

const options = {
  daysSinceUpdated: 7
};


export async function exportFeatures() {
  const factory = WorkItemFactory.getInstance();
  const features = (await factory.getByWiql(`
    [System.WorkItemType] == "Feature"
    AND [System.State] <> "Removed"
    AND (
      [System.IterationPath] UNDER 'BDC\\OAS\\R1'
      OR [System.IterationPath] UNDER 'BDC\\OAS\\R2'
    )`)).slice(0, 10);
  const walker = new Walker<WorkItem>();
  await walker.walk(features);
  await writeFile(await njk('feature-index.njk', { items: features }), `feature-index.html`);
}

/**
 * Main function
 */
(async () => {
  await exportFeatures();
})();

