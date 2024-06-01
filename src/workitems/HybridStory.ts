import { AdoWit } from "../AdoWit";
import { BaseWorkItem } from "./BaseWorkItem";

export class HybridStory extends BaseWorkItem {

    static async get(wiqlWhereClause?: string): Promise<HybridStory[]> {
        const workItems = await BaseWorkItem.getByWiql(`
        SELECT [System.Id]
        FROM workitems
        WHERE [System.WorkItemType] = "Hybrid Story" 
        AND ( ${wiqlWhereClause} )`
        );
        return workItems.map((wi: any) => new HybridStory(wi));
    }

    static async getById(id: number): Promise<HybridStory> {
        const workItems = await BaseWorkItem.getById(id);
        return new HybridStory(workItems[0]);
    }

    constructor(
        readonly data: any
    ) {
        super(data);
    }

}