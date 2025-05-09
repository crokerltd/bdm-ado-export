import { njk, writeFile } from "../utils";
import { Walker, WorkItem, WorkItemFactory } from "../workitems";

export async function exportProdBugs() {
    const factory = new WorkItemFactory();
    const bugs = (await factory.getByWiql(`
      [System.WorkItemType] == 'Bug'
      AND [Microsoft.VSTS.Common.Priority] IN ( 1, 2 )
      AND (
        [System.IterationPath] UNDER 'BDC\\OAS\\Production'
        OR ( [System.IterationPath] UNDER 'BDC\\OAS\\R3\\R3.0' AND [System.IterationLevel5] CONTAINS 'R' )
      )
      AND [System.State] != 'Closed'
    `));
    const walker = new Walker<WorkItem>();
    await walker.walk(bugs);
    await writeFile(await njk('prod-bug-index.njk', { items: bugs }), 'prod-bug-index.html');
  
    // const swimlanes = ['Production', 'R3.0.4.0 (patch)', 'Default'];
    const swimlanes = ['Default', 'R3.0.3.1 (urgent)', 'R3.0.4.0 (patch)' ];
    const swimlaneItems = bugs.map(i => ({
      ...i,
      swimlane: (() => {
        const s = i.iterationPath.replace(/BDC\\OAS\\(R3\\R3.0\\)?/g, '')
        if (swimlanes.includes(s)) {
          return s
        } else {
          return 'Default'
        }
      })(),
      relatedTasks: i.related?.filter(i => i.workitem.workItemType === 'Task'),
      relatedDecisions: i.related?.filter(i => i.workitem.workItemType === 'Project Decision'),
      relatedOpsProc: i.related?.filter(i => i.workitem.workItemType === 'Ticket'
        // && i.workitem.iterationPath === 'BDC\\OAS\\Production\\Data'
        && i.workitem.areaPath === 'BDC\\OAS\\OAS Operations')
    }))
    await writeFile(await njk('prod-bug-kanban.njk', { items: swimlaneItems, swimlanes }), 'prod-bug-kanban.html');
  }
  
