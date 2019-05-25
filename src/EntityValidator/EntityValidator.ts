import {Validator, Util} from '@shexjs/core';
import Loader from '@shexjs/loader';
import EntityValidatorResponse from '@/EntityValidator/EntityValidatorResponse';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';


export default class EntityValidator {
    private ENTITY_DATA_URL_BASE = 'https://www.wikidata.org/wiki/Special:EntityData/';

    constructor(private parsedSchema: any) {}

    public async validate(request: EntityValidatorRequest): Promise<EntityValidatorResponse> {
        const turtleDataUrl = this.ENTITY_DATA_URL_BASE + request.entityId + '.ttl';
        return Loader.load([], [], [turtleDataUrl], [])
            .then((loaded) => this.validateLoadedData(loaded, request.entityId))
            .then(this.buildResponseFromValidationResult);
    }

    private validateLoadedData(loaded: any, entityId: string) {
        const wrappedData = Util.makeN3DB(loaded.data);
        const entityDataUrl = this.ENTITY_DATA_URL_BASE + entityId;
        return Validator
            .construct(this.parsedSchema)
            .validate(wrappedData, entityDataUrl, this.parsedSchema.start);
    }

    private buildResponseFromValidationResult(validationResult: any): EntityValidatorResponse {
        return new EntityValidatorResponse(validationResult.type, validationResult.errors);
    }

}
