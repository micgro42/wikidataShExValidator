class SparqlFetcherResponse {
  public entities: string[];

  public constructor(entities: string[]) {
    this.entities = entities;
  }
}

export default SparqlFetcherResponse;
