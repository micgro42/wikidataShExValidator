import SparqlFetcher from '@/SparqlFetcher/SparqlFetcher';

describe('SparqlFetcher', () => {
  it('extracts Items from response', () => {
    const testApiResponse = {
      head: {
        vars: ['foo', 'fooLabel'],
      },
      results: {
        bindings: [
          {
            foo: {
              type: 'uri',
              value: 'http://www.wikidata.org/entity/Q28114532',
            },
            fooLabel: {
              'xml:lang': 'en',
              type: 'literal',
              value: 'Nala',
            },
          },
          {
            foo: {
              type: 'uri',
              value: 'http://www.wikidata.org/entity/Q28114535',
            },
            fooLabel: {
              'xml:lang': 'en',
              type: 'literal',
              value: 'Mr. White',
            },
          },
        ],
      },
    };

    const sparqlFetcher = new SparqlFetcher();
    const actualItems = sparqlFetcher.parseItemsFromResponse(testApiResponse);

    expect(actualItems).toEqual([
      'http://www.wikidata.org/entity/Q28114532',
      'http://www.wikidata.org/entity/Q28114535',
    ]);
  });
});
