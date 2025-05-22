import { njk, writeFile } from "../utils";
import { ADOWorkItem, EIFeature, EIWorkItemFactory, Walker, WorkItem, isEIFeatureWorkItem } from "../workitems";

class LocalItemFactory extends EIWorkItemFactory {
  protected convert(data?: ADOWorkItem): WorkItem | undefined {
    if (isEIFeatureWorkItem(data)) {
      return new EIFeature(data, this, true);
    } else {
      return super.convert(data)
    }
  }
}

export async function exportEIFeatures() {
  const factory = new LocalItemFactory();
  const items = (await factory.getByWiql(`
      [System.WorkItemType] Contains "Feature" AND [Custom.ReleaseEI] == "Release 3"
    `));
  const walker = new Walker<WorkItem>();
  await walker.walk(items);
  await writeFile(await njk('feature-table.njk', { items, global : { useADOUrls: true } }), 'ei-feature-table.html');
}