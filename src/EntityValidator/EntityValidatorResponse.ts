import { ValidationStatus } from '@/Store/ValidationStatus';

export default class EntityValidatorResponse {
    constructor(public status: ValidationStatus, public errorMessage: string) {}
}
