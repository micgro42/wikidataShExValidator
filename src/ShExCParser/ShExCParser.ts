import ShExParser, { ParsedSchema, ParserError } from '@shexjs/parser';
import ShExCParserRequest from './ShExCParserRequest';
import ShExCParserResponse from './ShExCParserResponse';

// FIXME the parse still think it runs on node and calls Error.captureStackTrace :/
Error.captureStackTrace = () => null;

class ShExCParser {
  public parse(request: ShExCParserRequest): ShExCParserResponse {
    const shExCText = request.getText();

    function parseShEx(
      text: string,
      meta: { base?: string; prefixes?: Record<string, unknown> },
    ): ParsedSchema {
      const shexParser = ShExParser.construct('');
      const ret = shexParser.parse(text);
      meta.base = '';
      meta.prefixes = ret.prefixes || {};
      return ret;
    }

    const meta = {};
    try {
      const parsed = parseShEx(shExCText, meta);
      return new ShExCParserResponse(parsed, null);
    } catch (e) {
      return new ShExCParserResponse(null, e as ParserError);
    }
  }
}

export default ShExCParser;
