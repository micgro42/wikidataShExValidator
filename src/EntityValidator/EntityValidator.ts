import {Validator, Util} from '@shexjs/core';
import EntityValidatorResponse from '@/EntityValidator/EntityValidatorResponse';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import {ValidationStatus} from '@/Store/ValidationStatus';


export default class EntityValidator {

    constructor(private parsedSchema: any) {}

    public async validate(request: EntityValidatorRequest): Promise<EntityValidatorResponse> {
        const queryDB = Util.makeQueryDB('https://query.wikidata.org/sparql');
        return new Promise((resolve) => {
            resolve(Validator
                .construct(this.parsedSchema, {results: 'api'})
                .validate(queryDB, [{node: request.entityUrl, shape: Validator.start}]));
        }).then(this.buildResponseFromValidationResult.bind(this));
    }

    private buildResponseFromValidationResult(validationResults: any): EntityValidatorResponse {
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

    private getResultErrors(result: any) {
        if (result.status === 'conformant') {
            return [];
        }
        return result.appinfo.errors.map(this.parseError);
    }

    private parseError(error: any): {type: string, message: string} {
        let message;
        if (error.type === 'MissingProperty') {
            message = error.property;
        }
        if (error.type === 'TypeMismatch') {
            message = error.errors[0].errors[0];
        }
        return {
            type: error.type,
            message,
        };

    }

}
