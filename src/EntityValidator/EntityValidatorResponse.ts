import { ValidationStatus } from '@/Store/ValidationStatus';

export default class EntityValidatorResponse {
  public status: ValidationStatus;
  public errorMessage: string;

  public constructor(status: ValidationStatus, errorMessage: string) {
    this.status = status;
    this.errorMessage = errorMessage;
  }
}
