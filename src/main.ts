
import { exportProdBugs } from "./reports/exportProdBugs";
import { exportOASFeatures } from "./reports/exportOASFeatures";
import { exportEIFeatures } from "./reports/exportEIFeatures";
import { exportProdTracking } from "./reports/exportProdTracking";
import { WorkItemCache } from "./workitems/ado/WorkItemCache";

/**
 * Main function
 */
(async () => {
  const cache = WorkItemCache.getInstance();

  if (process.argv.includes('cache')) {
    console.log("using local cache")
    cache.useCache.wiql = true;
    cache.useCache.comments = true;
    cache.useCache.workitems = true;
  }

  if (process.argv.includes('cache-items')) {
    console.log("using local workitems cache")
    cache.useCache.comments = true;
    cache.useCache.workitems = true;
  }

  if (process.argv.includes('nocache')) {
    console.log("disabling all local caching")
    cache.useCache.wiql = false;
    cache.useCache.comments = false;
    cache.useCache.workitems = false;
    cache.useCache.write = false;
  }

  if (process.argv.includes('oas-features')) {
    console.log('exporting features');
    await exportOASFeatures();
  }

  if (process.argv.includes('prod-bugs')) {
    console.log('exporting production bugs');
    await exportProdBugs();
  }

  if (process.argv.includes('prod-if')) {
    console.log('exporting production tracking interfaces');
    await exportProdTracking();
  }

  if (process.argv.includes('ei-features')) {
    console.log('exporting EI Features');
    await exportEIFeatures();
  }

  await cache.close()
})();

