/// <reference types="node" />

declare module '@shexjs/core' {
  export const Validator: {
    start: Record<string, unknown>;
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

  // eslint-disable-next-line
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
    shape: Record<string, unknown>;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Appinfo {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Database {}
}
