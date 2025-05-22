import { WorkItemFactory } from "../ado/WorkItemFactory";
import { ADOWorkItem, WorkItem } from "../ado/types";
import { EIFeature, isEIFeatureWorkItem } from "./EIFeature";

export class EIWorkItemFactory extends WorkItemFactory {

    protected convert(data?: ADOWorkItem): WorkItem | undefined {
        if (isEIFeatureWorkItem(data)) {
            return new EIFeature(data, this);
        } else {
            return super.convert(data)
        }
    }

}