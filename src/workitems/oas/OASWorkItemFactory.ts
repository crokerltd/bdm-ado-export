import { WorkItemFactory } from "../ado/WorkItemFactory";
import { OASBug, isOASBugWorkItem } from "./OASBug";
import { OASFeature, isOASFeatureWorkItem } from "./OASFeature";
import { OASHybridStory } from "./OASHybridStory";
import { ADOWorkItem, WorkItem, isADOWorkItem } from "../ado/types";

export class OASWorkItemFactory extends WorkItemFactory {

    protected convert(data?: ADOWorkItem): WorkItem | undefined {
        if (isOASFeatureWorkItem(data)) {
            return new OASFeature(data, this);
        } else if (isOASBugWorkItem(data)) {
            return new OASBug(data, this);
        } else if (isADOWorkItem(data) && data.fields["System.WorkItemType"] == 'Hybrid Story') {
            return new OASHybridStory(data, this);
        } else {
            return super.convert(data)
        }
    }

}