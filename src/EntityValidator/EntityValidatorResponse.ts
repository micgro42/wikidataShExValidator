import { ValidationStatus } from '@/Store/ValidationStatus';

export default class EntityValidatorResponse {
  public constructor(
    public status: ValidationStatus,
    public errorMessage: string,
  ) {}
}
