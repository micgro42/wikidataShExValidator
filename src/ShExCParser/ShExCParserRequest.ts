class ShExCParserRequest {
  public text: string;

  public constructor(text: string) {
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }
}

export default ShExCParserRequest;
