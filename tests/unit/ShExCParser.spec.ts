import ShExCParserRequest from '@/ShExCParser/ShExCParserRequest';
import ShExCParser from '@/ShExCParser/ShExCParser';

describe('ShExCParser', () => {
  it('passes on empty schema', () => {
    const request = new ShExCParserRequest('');
    const parser = new ShExCParser();

    const response = parser.parse(request);

    expect(response.error).toBeNull();
  });

  it('throws error on broken schema', () => {
    const request = new ShExCParserRequest('not a schema');
    const parser = new ShExCParser();

    const response = parser.parse(request);

    expect(response.error !== null).toBeTruthy();
    if (response.error !== null) {
      expect(response.error.lineNo).toBe(1);
      expect(response.error.message).toBe(
        /* tslint:disable */
        `(1): Parse error on line 1:
not a schema
^
Expecting 'EOF', 'IT_BASE', 'IRIREF', 'IT_PREFIX', 'PNAME_NS', 'IT_IMPORT', 'IT_start', 'IT_ABSTRACT', '%', 'PNAME_LN', 'BLANK_NODE_LABEL', got 'unexpected word "not"'
`,
        /* tslint:enable */
      );
    }
  });
});
