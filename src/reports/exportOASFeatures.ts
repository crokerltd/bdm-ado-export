import { njk, writeFile } from "../utils";
import { OASWorkItemFactory, Walker, WorkItem } from "../workitems";

export async function exportOASFeatures() {
    const factory = new OASWorkItemFactory();
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
  