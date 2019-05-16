/// <reference types="node" />

declare module '@shexjs/core' {
    export const Validator: {
        construct(schema: any, options?: { lax: boolean, diagnose: boolean }): ShExValidator_constructor,
    };

    export const Util: {
        makeN3DB(data: any, queryTracker?: any): any;
    };

    export class ShExValidator_constructor {
        public validate(db: any, point: any, label: any, tracker?: any, seen?: any, subGraph?: any
        ): {
            schema: any,
            data: any,
            schemaMeta: any,
            dataMeta: any,
        };
    }
}
