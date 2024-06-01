import { writeFileSync } from "fs";

/**
 * Splits an array into an array of smaller arrays with no more chunkSize elements
 * 
 * @param a         The array to split
 * @param chunkSize The maximum number of elements in each chunk
 * @returns         A chunked array, of arrays T[] => T[][]
 */
export function chunkArray<T>(a: T[], chunkSize: number): T[][] {
    // Map this into an array of number
    const batchedWorkItems: T[][] = [];
    for (let i = 0; i < a.length; i += chunkSize) {
        const chunk = a.slice(i, i + chunkSize);
        batchedWorkItems.push(chunk);
    }
    return batchedWorkItems;
}

export function getEnv(name: string): string {
    let val = process.env[name];
    if (!val) {
        console.error(`${name} env var not set`);
        process.exit(1);
    }
    return val;
}

export function writeFile(data: any, filename: string) {
    writeFileSync(filename, data, { encoding: 'utf8' })
}