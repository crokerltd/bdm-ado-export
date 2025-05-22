import * as nunjucks from 'nunjucks';
import { BaseWorkItem, RelatedWorkItem } from '../workitems';
import { getEnv } from './utils';

/**
 * Use a njk template to render a string
 * 
 * @param template Template file to use, relative to the templates directory
 * @param context  Context data for the njk template generation
 * @returns        Rendered string
 */
export async function njk(template: string, context: any = {}, mod?: (e: nunjucks.Environment) => void): Promise<string> {
    context.global = {
        ...context.global,
        projectId: getEnv("ADO_API_PROJECT"),
        orgId: getEnv("ADO_API_ORG")
    }

    return new Promise<string>(async (resolve, reject) => {
        nunjucks.configure({
            autoescape: false
        });
        const env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(__dirname + '/../../templates'), { autoescape: false }
        );

        // Joins a string array with a comma and space
        env.addFilter('join', function (b: (string | number)[]) {
            return (b || []).map(i => `${i}`).join(', ');
        });

        env.addFilter('parseUrls', function (b?: string) {
            if (typeof b !== 'string') {
                return b;
            }
            return b
                .replace(/"https?:\/\/dev.azure.com\/VP-BD\/[^"]*_workitems(\/edit)?\/([0-9]+)"/g, '"$2.html"');
        });
        env.addFilter('cleanHtml', function (b?: string) {
            if (typeof b !== 'string') {
                return b;
            }
            return b
                .replace(/\<img[^\>]*\>/gi, '[img]')
                .replace(/font-size:/gi, 'font-size-invalid:')
        });
        env.addFilter('mostRecent', function (b?: any, count: number = 1) {
            if (!Array.isArray(b)) {
                return b;
            }
            if (b.every(i => typeof i.createdDate === "string")) {
                b.sort((a, b) => (a.createdDate > b.createdDate) ? -1 : 1)
            }
            return b.slice(0, count)
        });
        env.addFilter('wiFilterExcludeStates', function (items: BaseWorkItem[], excludeStates: string[]) {
            return items?.filter(i => !excludeStates.includes(i.state))
        })
        env.addFilter('wiFilterIncludeStates', function (items: BaseWorkItem[], includeStates: string[]) {
            return items?.filter(i => includeStates.includes(i.state))
        })
        env.addFilter('wiFilterIncludeIterationPaths', function (items: BaseWorkItem[], includePaths: string[]) {
            const pathRegExp = includePaths.map(p => new RegExp(p))
            return items?.filter(i => pathRegExp.some(p => p.test(i.iterationPath)))
        })
        env.addFilter('wiFilterExcludeIterationPaths', function (items: BaseWorkItem[], excludePaths: string[]) {
            const pathRegExp = excludePaths.map(p => new RegExp(p))
            return items?.filter(i => !pathRegExp.some(p => p.test(i.iterationPath)))
        })
        env.addFilter('relatedWorkItem', function (items?: RelatedWorkItem | RelatedWorkItem[]) {
            if (Array.isArray(items)) {
                return (items || []).map(i => i.workitem)
            } else {
                return items?.workitem
            }
        })
        env.addFilter('shrinkProdIterationPath', function (b?: string) {
            if (typeof b !== 'string') {
                return b;
            }
            return b.replace(/BDC\\OAS\\(R3\\R3.0\\)?/g, '');
        })
        env.addFilter('yesNo', function (b?: boolean) {
            if (typeof b !== 'boolean') {
                return b;
            }
            return (b) ? 'Yes' : 'No'
        })
        env.addFilter('okBlank', function (b?: boolean) {
            if (typeof b !== 'boolean') {
                return b;
            }
            return (b) ? 'Ok' : ''
        })


        if (mod !== undefined) {
            mod(env)
        }


        if (mod !== undefined) {
            mod(env)
        }

        env.render(template, context,
            (err: Error | null, res: string | null) => {
                if (err || res === null) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}