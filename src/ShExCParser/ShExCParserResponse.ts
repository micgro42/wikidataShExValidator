import { ParsedSchema, ParserError } from '@shexjs/parser';

class ShExCParserResponse {
  public parsedSchema: ParsedSchema | null;

  public error: null | {
    message: string;
    lineNo: number;
  } = null;

  public constructor(
    parsedSchema: ParsedSchema | null,
    error: ParserError | null,
  ) {
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
