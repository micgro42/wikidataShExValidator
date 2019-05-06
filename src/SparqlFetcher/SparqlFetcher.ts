import SparqlFetcherRequest from '@/SparqlFetcher/SparqlFetcherRequest';
import SparqlFetcherResponse from '@/SparqlFetcher/SparqlFetcherResponse';

class SparqlFetcher {
    private readonly QUERY_URL = 'https://query.wikidata.org/sparql?format=json&query=';


    public async fetchItems(request: SparqlFetcherRequest): Promise<SparqlFetcherResponse> {

        const apiResponse = await fetch(this.QUERY_URL + encodeURIComponent(request.query))
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                return items;
            });


        return new SparqlFetcherResponse(this.parseItemsFromResponse(apiResponse));
    }

    public parseItemsFromResponse(response: { head: { vars: string[] }, results: { bindings: any[] } }): string[] {
        if (response.results.bindings.length === 0) {
            return [];
        }
        const vars = response.head.vars;
        const responseItems = response.results.bindings;
        return responseItems.map((respItem) => {
            for (const key in respItem) {
                if (respItem[key].type !== 'uri') {
                    continue;
                }
                if (!respItem[key].value.match(/http(s?):\/\/www.wikidata.org\/entity\//)) {
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
