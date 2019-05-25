import {Validator, Util} from '@shexjs/core';
import Loader from '@shexjs/loader';
import EntityValidatorResponse from '@/EntityValidator/EntityValidatorResponse';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import {ValidationStatus} from '@/Store/ValidationStatus';


export default class EntityValidator {
    private ENTITY_DATA_URL_BASE = 'https://www.wikidata.org/wiki/Special:EntityData/';

    constructor(private parsedSchema: any) {}

    public async validate(request: EntityValidatorRequest): Promise<EntityValidatorResponse> {
        const turtleDataUrl = this.ENTITY_DATA_URL_BASE + request.entityId + '.ttl';
        return Loader.load([], [], [turtleDataUrl], [])
            .then((loaded) => this.validateLoadedData(loaded, request.entityUrl))
            .then(this.buildResponseFromValidationResult.bind(this));
    }

    private validateLoadedData(loaded: any, nodeUrl: string) {
        const wrappedData = Util.makeN3DB(loaded.data);
        return Validator
            .construct(this.parsedSchema, { results: 'api' })
            .validate(wrappedData, [{node: nodeUrl, shape: Validator.start}]);
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
        return result.appinfo.errors;
    }

}
