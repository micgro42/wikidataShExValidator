/// <reference types="node" />

declare module '@shexjs/parser' {

    export function construct(baseIRI: string, prefixes?: object, schemaOptions?: object): ShExJison;

    export class ShExJison {
        public parse(text: string): any;
    }
}
