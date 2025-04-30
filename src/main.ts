import { writeFile } from "./utils";
import { njk } from "./njk";
import { WorkItemFactory } from "./workitems/WorkItemFactory";
import { Walker } from "./Walker";
import { WorkItem } from "./workitems/types";

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

export async function exportProdBugs() {
  const factory = WorkItemFactory.getInstance();
  const bugs = (await factory.getByWiql(`
    [System.WorkItemType] == 'Bug'
    AND (
      [System.IterationPath] UNDER 'BDC\\OAS\\Production'
      OR ( [System.IterationPath] UNDER 'BDC\\OAS\\R3\\R3.0' AND [System.IterationLevel5] CONTAINS 'R' )
    )
    AND [System.State] != 'Closed'
  `));
  const walker = new Walker<WorkItem>();
  await walker.walk(bugs);
  await writeFile(await njk('prod-bug-index.njk', { items: bugs }), `prod-bug-index.html`);
}

/**
 * Main function
 */
(async () => {
  switch (process.argv[2]) {
    case 'features':
      console.log('exporting features');
      await exportFeatures();
      break;
    case 'prod-bugs':
      console.log('exporting production bugs');
      await exportProdBugs();
      break;
  }
  await WorkItemFactory.getInstance().close()
}) ();

