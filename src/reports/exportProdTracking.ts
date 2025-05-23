import { njk, writeFile } from "../utils";
import { ADOWorkItem, OASBug, OASWorkItemFactory, Walker, WorkItem, isOASBugWorkItem } from "../workitems";

class ProdTrackingItemFactory extends OASWorkItemFactory {
  protected convert(data?: ADOWorkItem): WorkItem | undefined {
    if (isOASBugWorkItem(data)) {
      return new OASBug(data, this, true);
    } else {
      return super.convert(data)
    }
  }
}

export async function exportProdTracking() {
  const factory = new ProdTrackingItemFactory();
  const items = (await factory.getByWiql(`
      [System.WorkItemType] == "Tracking Activity"
      AND [System.AreaPath] UNDER 'BDC\\OAS\\OAS Operations'
      AND [System.State] <> "Removed"
      AND ( [System.IterationPath] UNDER 'BDC\\OAS\\R3' OR [System.IterationPath] UNDER 'BDC\\OAS\\Production' )
    `));
  const walker = new Walker<WorkItem>();
  await walker.walk(items);
  const adjItems = items.map(i => ({
    ...i,
    aprilComplete: (
      i.related?.filter(i => i.workitem.workItemType === 'Task'
        && i.workitem.title.match(/April Acc?ounting/)
        && i.workitem.state == 'Closed'
      ) || []).length > 0,
    mayComplete: (
      i.related?.filter(i => i.workitem.workItemType === 'Task'
        && i.workitem.title.match(/May Acc?ounting/)
        && i.workitem.state == 'Closed'
      ) || []).length > 0,
    tasks: (
      i.related?.filter(i => i.workitem.workItemType === 'Task'
        && !i.workitem.title.match(/(May|April) Acc?ounting/)
      )),
    opsProcs: i.related?.filter(i => i.workitem.workItemType == 'Ticket' && i.workitem.title.match(/Operational Procedure/i)),
    bugs: i.related?.filter(i => i.workitem.workItemType == 'Bug')
  }))
  await writeFile(await njk('prod-tracking-index.njk', { items: adjItems }), 'prod-tracking-index.html');
}