/// <reference types="node" />

declare module '@shexjs/loader' {

    export function load(
        shex: string[],
        json: string[],
        turtle: string[],
        jsonld?: string[],
        schemaOptions?: {},
        dataOptions?: any,
    ): Promise<any>;
}
