/// <reference types="node" />

declare module '@shexjs/core' {
  export const Validator: {
    start: object;
    construct(
      schema: unknown, // actually ParsedSchema from @shexjs/parser
      options?: { lax?: boolean; diagnose?: boolean; results?: string },
    ): ShExValidator_constructor;
  };

  export const Util: {
    /**
     * emulate N3Store().getQuads() with additional parm.
     */
    makeQueryDB(endpoint: string, queryTracker?: unknown): Database;

    errsToSimple(val: Appinfo, node?: unknown, shape?: unknown): string[];
  };

  /* tslint:disable-next-line */
  export class ShExValidator_constructor {
    public validate(
      db: Database,
      point: ShExPoint[],
      label?: unknown,
      tracker?: unknown,
      seen?: unknown,
      subGraph?: unknown,
    ): ValidationResult[];
  }

  export interface ValidationResult {
    appinfo: Appinfo;
    status: string;
  }

  export interface ShExPoint {
    node: string;
    shape: object;
  }

  interface Appinfo {}

  interface Database {}
}
