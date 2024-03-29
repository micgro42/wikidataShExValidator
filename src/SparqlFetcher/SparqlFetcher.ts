import SparqlFetcherRequest from '@/SparqlFetcher/SparqlFetcherRequest';
import SparqlFetcherResponse from '@/SparqlFetcher/SparqlFetcherResponse';

class SparqlFetcher {
  private readonly QUERY_URL =
    'https://query.wikidata.org/sparql?format=json&query=';

  public async fetchItems(
    request: SparqlFetcherRequest,
  ): Promise<SparqlFetcherResponse> {
    const apiResponse = await fetch(
      this.QUERY_URL + encodeURIComponent(request.query),
    )
      .then(async (response) => {
        if (response.status !== 200) {
          const sparqlErrorText = await response.text();
          const mainErrorLines = sparqlErrorText.split('\n').filter((line) => {
            return line.includes('MalformedQueryException');
          });
          if (mainErrorLines.length) {
            throw Error(mainErrorLines[0]);
          }
          throw Error(sparqlErrorText);
        }
        return response.json();
      })
      .then((items) => {
        return items;
      });

    return new SparqlFetcherResponse(this.parseItemsFromResponse(apiResponse));
  }

  public parseItemsFromResponse(response: {
    head: { vars: string[] };

    // this might be any kind of result, so we have to iterarte over the keys and thus need any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: { bindings: any[] };
  }): string[] {
    if (response.results.bindings.length === 0) {
      return [];
    }
    const responseItems = response.results.bindings;
    return responseItems.map((respItem) => {
      for (const key in respItem) {
        if (respItem[key].type !== 'uri') {
          continue;
        }
        if (
          !respItem[key].value.match(/http(s?):\/\/www.wikidata.org\/entity\//)
        ) {
          continue;
        }
        return respItem[key].value;
      }
    });
  }
}

export default SparqlFetcher;

/*
{type: string, value: string}

 head:
 vars: (2) ["foo", "fooLabel"]
 __proto__: Object
 results:
 bindings: Array(10)
 0:
 foo: {type: "uri", value: "http://www.wikidata.org/entity/Q378619"}
 fooLabel: {xml:lang: "en", type: "literal", value: "CC"}
 */
