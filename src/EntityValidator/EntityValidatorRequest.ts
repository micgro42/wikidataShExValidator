import { ParsedSchema } from '@shexjs/parser';

export default class EntityValidatorRequest {
  public entityId: string;
  public entityUrl: string;
  public parsedSchema: ParsedSchema;

  public constructor(
    parsedSchema: ParsedSchema,
    entityId: string,
    entityUrl: string,
  ) {
    this.parsedSchema = parsedSchema;
    this.entityId = entityId;
    this.entityUrl = entityUrl;
  }
}
