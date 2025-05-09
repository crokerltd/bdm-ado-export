import { njk, writeFile } from "../utils";
import { Walker, WorkItem, WorkItemFactory } from "../workitems";

export async function exportFeatures() {
    const factory = new WorkItemFactory();
    const features = (await factory.getByWiql(`
      [System.WorkItemType] == "Feature"
      AND [System.State] <> "Removed"
      AND (
        [System.IterationPath] UNDER 'BDC\\OAS\\R1'
        OR [System.IterationPath] UNDER 'BDC\\OAS\\R2'
      )`)).slice(0, 10);
    const walker = new Walker<WorkItem>();
    await walker.walk(features);
    await writeFile(await njk('feature-index.njk', { items: features }), 'feature-index.html');
  }
  