import { writeFile } from "./utils";
import { njk } from "./njk";
import { WorkItemFactory } from "./workitems/WorkItemFactory";
import { Walker } from "./Walker";
import { WorkItem } from "./workitems/types";
import * as nunjucks from 'nunjucks';

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
  await writeFile(await njk('feature-index.njk', { items: features }), 'feature-index.html');
}

export async function exportProdBugs() {
  const factory = WorkItemFactory.getInstance();
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
  await writeFile(await njk('prod-bug-index.njk', { items: bugs }, prodBugNjk), 'prod-bug-index.html');

  const swimlanes = ['Production', 'R3.0.4.0 (patch)'];
  const swimlaneItems = bugs.map(i => ({
    ...i,
    swimlane: (() => {
      const s = i.iterationPath.replace(/BDC\\OAS\\(R3\\R3.0\\)?/g, '')
      if (swimlanes.includes(s)) {
        return s
      } else {
        return undefined
      }
    })(),
    relatedTasks: i.related?.filter(i => i.workitem.workItemType === 'Task'),
    relatedDecisions: i.related?.filter(i => i.workitem.workItemType === 'Project Decision')
  }))
  await writeFile(await njk('prod-bug-kanban.njk', { items: swimlaneItems, swimlanes }, prodBugNjk), 'prod-bug-kanban.html');
}

function prodBugNjk(env: nunjucks.Environment) {
  env.addFilter('shrinkProdIterationPath', function (b?: string) {
    if (typeof b !== 'string') {
      return b;
    }
    return b.replace(/BDC\\OAS\\(R3\\R3.0\\)?/g, '');
  })
}

/**
 * Main function
 */
(async () => {
  if (process.argv.includes('cache')) {
    console.log("using local cache")
    WorkItemFactory.useCache.wiql = true;
    WorkItemFactory.useCache.comments = true;
    WorkItemFactory.useCache.workitems = true;
  }

  if (process.argv.includes('cache-items')) {
    console.log("using local workitems cache")
    WorkItemFactory.useCache.comments = true;
    WorkItemFactory.useCache.workitems = true;
  }

  if (process.argv.includes('features')) {
    console.log('exporting features');
    await exportFeatures();
  }

  if (process.argv.includes('prod-bugs')) {
    console.log('exporting production bugs');
    await exportProdBugs();
  }

  await WorkItemFactory.getInstance().close()
})();

