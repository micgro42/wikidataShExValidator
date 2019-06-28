class ShExCParserResponse {
  public parsedSchema: any;

  public error: null | {
    message: string;
    lineNo: number;
  } = null;

  public constructor(parsedSchema: any, error: any) {
    this.parsedSchema = parsedSchema;

    if (error) {
      this.error = {
        message: error.message,
        lineNo: error.lineNo,
      };
    }
  }
}

export default ShExCParserResponse;
