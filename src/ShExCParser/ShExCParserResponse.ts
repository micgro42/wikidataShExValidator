class ShExCParserResponse {
  public error: null | {
    message: string;
    lineNo: number;
  } = null;

  public constructor(public parsedSchema: any, error: any) {
    if (error) {
      this.error = {
        message: error.message,
        lineNo: error.lineNo,
      };
    }
  }
}

export default ShExCParserResponse;
