import {Validator, Util} from '@shexjs/core';
import Loader from '@shexjs/loader';
import EntityValidatorResponse from '@/EntityValidator/EntityValidatorResponse';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';


export default class EntityValidator {

    constructor(private parsedSchema: any) {}

    public async validate(request: EntityValidatorRequest): Promise<EntityValidatorResponse> {
        const entityDataUrl = 'https://www.wikidata.org/wiki/Special:EntityData/' + request.entityId;
        const turtleDataUrl = entityDataUrl + '.ttl';
        const loaderReturn = Loader.load([], [], [turtleDataUrl]).then((loaded: any) => {
            const wrappedData = Util.makeN3DB(loaded.data);
            const validationResult = Validator.construct(this.parsedSchema).validate(wrappedData, entityDataUrl, this.parsedSchema.start);
            console.log(validationResult);
            return validationResult;
        }).then((promiseRes: any) => {
            return new EntityValidatorResponse(promiseRes.type, promiseRes.errors);
        });
        return loaderReturn;
    }

}

/*
{…}
​
errors: (2) […]
​​
0: {…}
​​​
__ob__: Object { value: {…}, dep: {…}, vmCount: 0 }
​​​
property: "http://www.wikidata.org/prop/P31"
​​​
type: "MissingProperty"
​​​
valueExpr: Object { 0: Getter & Setter, 1: Getter & Setter, 2: Getter & Setter, … }
​​​
<get property()>: function reactiveGetter()​​​
<set property()>: function reactiveSetter()​​​
<get type()>: function reactiveGetter()​​​
<set type()>: function reactiveSetter()​​​
<get valueExpr()>: function reactiveGetter()​​​
<set valueExpr()>: function reactiveSetter()​​​
<prototype>: Object { … }
​​
1: {…}
​​​
__ob__: Object { value: {…}, dep: {…}, vmCount: 0 }
​​​
property: "http://www.wikidata.org/prop/P569"
​​​
type: "MissingProperty"
​​​
<get property()>: function reactiveGetter()​​​
<set property()>: function reactiveSetter()​​​
<get type()>: function reactiveGetter()​​​
<set type()>: function reactiveSetter()​​​
<prototype>: Object { … }
​​
__ob__: Object { value: (2) […], dep: {…}, vmCount: 0 }
​​
length: 2
​​
<prototype>: Object { … }
​
node: "https://www.wikidata.org/wiki/Special:EntityData/Q30600575"
​
shape: "wikidata-cat"
​
type: "Failure"
​
<prototype>: Object
*/
