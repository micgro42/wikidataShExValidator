export default class EntityValidatorResponse {
    // FIXME: status must be an enum!!!
    constructor(public status: string, public errors: object) {}
}
