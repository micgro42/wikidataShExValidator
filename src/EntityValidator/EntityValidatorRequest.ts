export default class EntityValidatorRequest {
  public entityId: string;
  public entityUrl: string;

  public constructor(entityId: string, entityUrl: string) {
    this.entityId = entityId;
    this.entityUrl = entityUrl;
  }
}
