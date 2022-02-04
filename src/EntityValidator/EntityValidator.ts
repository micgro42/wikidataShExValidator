import { Validator, Util, ValidationResult } from '@shexjs/core';
import EntityValidatorResponse from '@/EntityValidator/EntityValidatorResponse';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import { ValidationStatus } from '@/Store/ValidationStatus';

export default class EntityValidator {
  private endpoint: string;

  public constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async validate(
    request: EntityValidatorRequest,
  ): Promise<EntityValidatorResponse> {
    const queryDB = Util.makeQueryDB(this.endpoint);

    return new Promise<ValidationResult[]>((resolve) => {
      const validationResults: ValidationResult[] = Validator.construct(
        request.parsedSchema,
        {
          results: 'api',
        },
      ).validate(queryDB, [
        { node: request.entityUrl, shape: Validator.start },
      ]);
      resolve(validationResults);
    })
      .then(this.buildResponseFromValidationResult.bind(this))
      .catch((reason) => {
        // This might happen if the ShExC has no "start" directive
        return new EntityValidatorResponse(
          ValidationStatus.Nonconformant,
          reason,
        );
      });
  }

  private buildResponseFromValidationResult(
    validationResults: ValidationResult[],
  ): EntityValidatorResponse {
    return new EntityValidatorResponse(
      this.getResultStatus(validationResults[0]),
      this.getResultErrors(validationResults[0]),
    );
  }

  private getResultStatus(result: ValidationResult): ValidationStatus {
    if (result.status === 'conformant') {
      return ValidationStatus.Conformant;
    }
    return ValidationStatus.Nonconformant;
  }

  private getResultErrors(result: ValidationResult): string {
    if (result.status === 'conformant') {
      return '';
    }
    return Util.errsToSimple(result.appinfo).join('\n');
  }
}
