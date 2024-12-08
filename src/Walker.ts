export interface WalkedNode<T> {
    id: number;
    getRelatedNodes: () => Promise<WalkedNode<T>[]>;
    processNode: () => Promise<void>;
}

export class Walker<T> {

    private traversed: Set<number> = new Set<number>();

    constructor(
    ) {
        // Do Nothing,
    }

    async walk(nodes: WalkedNode<T>[]) {
        for (const n of nodes) {
            if (!this.traversed.has(n.id)) {
                this.traversed.add(n.id);
                await this.walk(await n.getRelatedNodes());
                await n.processNode();
            }
        }
    }

}