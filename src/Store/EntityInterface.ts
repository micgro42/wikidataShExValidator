import {ValidationStatus} from '@/Store/ValidationStatus';

export default interface EntityInterface {
    [propName: string]: {
        url: string,
        status?: ValidationStatus,
        errors?: [{
            type: string,
            property: string,
        }],
    };
}
