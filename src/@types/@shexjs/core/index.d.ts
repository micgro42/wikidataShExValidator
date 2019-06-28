/// <reference types="node" />

declare module '@shexjs/core' {
  export const Validator: {
    start: object;
    construct(
      schema: any,
      options?: { lax?: boolean; diagnose?: boolean; results?: string },
    ): ShExValidator_constructor;
  };

  export const Util: {
    /**
     * emulate N3Store().getQuads() with additional parm.
     */
    makeQueryDB(endpoint: string, queryTracker?: any): any;

    errsToSimple(val: any, node?: any, shape?: any): string[];
  };

  /* tslint:disable-next-line */
  export class ShExValidator_constructor {
    public validate(
      db: any,
      point: any,
      label?: any,
      tracker?: any,
      seen?: any,
      subGraph?: any,
    ): {
      schema: any;
      data: any;
      schemaMeta: any;
      dataMeta: any;
    };
  }
}
