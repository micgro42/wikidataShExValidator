/// <reference types="node" />

declare module '@shexjs/parser' {
  export function construct(
    baseIRI: string,
    prefixes?: Record<string, unknown>,
    schemaOptions?: Record<string, unknown>,
  ): ShExJison;

  export class ShExJison {
    public parse(text: string): ParsedSchema;
  }

  interface ParsedSchema {
    prefixes?: Record<string, unknown>;
  }

  interface ParserError extends Error {
    lineNo: number;
  }
}
