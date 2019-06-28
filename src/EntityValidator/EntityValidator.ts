import { Validator, Util } from '@shexjs/core';
import EntityValidatorResponse from '@/EntityValidator/EntityValidatorResponse';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import { ValidationStatus } from '@/Store/ValidationStatus';

export default class EntityValidator {
  public constructor(private parsedSchema: any) {}

  public async validate(
    request: EntityValidatorRequest,
  ): Promise<EntityValidatorResponse> {
    const queryDB = Util.makeQueryDB('https://query.wikidata.org/sparql');

    return new Promise(resolve => {
      resolve(
        Validator.construct(this.parsedSchema, { results: 'api' }).validate(
          queryDB,
          [{ node: request.entityUrl, shape: Validator.start }],
        ),
      );
    })
      .then(this.buildResponseFromValidationResult.bind(this))
      .catch(reason => {
        // This might happen if the ShExC has no "start" directive
        return new EntityValidatorResponse(
          ValidationStatus.Nonconformant,
          reason,
        );
      });
  }

  private buildResponseFromValidationResult(
    validationResults: any,
  ): EntityValidatorResponse {
    return new EntityValidatorResponse(
      this.getResultStatus(validationResults[0]),
      this.getResultErrors(validationResults[0]),
    );
  }

  private getResultStatus(result: any): ValidationStatus {
    if (result.status === 'conformant') {
      return ValidationStatus.Conformant;
    }
    return ValidationStatus.Nonconformant;
  }

  private getResultErrors(result: any): string {
    if (result.status === 'conformant') {
      return '';
    }
    return Util.errsToSimple(result.appinfo).join('\n');
  }
}
