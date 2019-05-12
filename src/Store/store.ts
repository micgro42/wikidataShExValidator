import Vue from 'vue';
import Vuex from 'vuex';
import ShExCParser from '../ShExCParser/ShExCParser';
import ShExCParserRequest from '../ShExCParser/ShExCParserRequest';
import SparqlFetcher from '@/SparqlFetcher/SparqlFetcher';
import SparqlFetcherRequest from '@/SparqlFetcher/SparqlFetcherRequest';
import SparqlFetcherResponse from '@/SparqlFetcher/SparqlFetcherResponse';
import EntityValidator from '@/EntityValidator/EntityValidator';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Query: '',
        QueryEntities: {},
        ShemaParsed: {},
        ShExC: '',
        ShExCParseError: {
            message: '',
            lineNo: -1,
        },
        // ShExCParseError: {
        //     message: '(15): Parse error; unknown prefix: pX\n' +
        //         '... STATEMENTS\tpX:P31 @<P31_instance_of_ho\n' +
        //         '----------------------^',
        //     lineNo: 16,
        //     context: '... STATEMENTS	pX:P31 @<P31_instance_of_ho\n----------------------^ string',
        //     errorOffset: 519,
        //     errorWidth: 1,
        //     lloc: {
        //         first_line: 15,
        //         last_line: 15,
        //         first_column: 8,
        //         last_column: 9,
        //     },
        // },
    },
    getters: {
        getShExCParseError(state) {
            return state.ShExCParseError;
        },
        getQueryEntities(state) {
            return state.QueryEntities;
        },
    },
    mutations: {
        setQuery(state, payload: { query: string }) {
            state.Query = payload.query;
        },
        setQueryEntities(state, payload: { entities: string[] }) {
            state.QueryEntities = payload.entities;
        },
        setEntityData(state, payload: {id: string, status: string, errors: object}) {
            state.QueryEntities[payload.id] = {
                ...state.QueryEntities[payload.id],
                status: payload.status,
                errors: payload.errors,
            };
        },
        setShExC(state, ShExCText) {
            state.ShExC = ShExCText;
        },
        setShExCError(state, {errorMessage, lineNo}) {
            state.ShExCParseError = {
                message: errorMessage,
                lineNo,
            };
        },
        setParsedSchema(state, schemaParsed) {
            state.ShemaParsed = schemaParsed;
        },
        clearShExCError(state) {
            state.ShExCParseError = {
                message: '',
                lineNo: -1,
            };
        },
    },
    actions: {
        setQuery({commit, state}, query: string) {
            commit('setQuery', {query});
            const sparqlFetcher = new SparqlFetcher();
            sparqlFetcher.fetchItems(new SparqlFetcherRequest(query))
                .then((resp: SparqlFetcherResponse) => {
                    commit('setQueryEntities', {
                        entities: resp.entities.reduce((carry: object, url: string) => {
                            const entityID = url.match(/[QPL]\d+/);
                            if (entityID === null || !entityID[0]) {
                                console.warn('unexpected match for', url, entityID);
                                return carry;
                            }
                            carry[entityID[0]] = {url};
                            return carry;
                        }, {}),
                    });
                })
                .then(async () => {
                    if (Object.keys(state.QueryEntities).length === 0) {
                        return;
                    }
                    if (state.ShExCParseError.message.length !== 0) {
                        return;
                    }
                    const validator = new EntityValidator(state.ShemaParsed);
                    for (const entity of Object.keys(state.QueryEntities)) {
                        const response = await validator.validate(new EntityValidatorRequest(entity));
                        commit('setEntityData', {
                            id: entity,
                            status: response.status,
                            errors: response.errors,
                        })
                    }
                });
        },
        setShExC({commit}, ShExCText: string) {
            commit('setShExC', ShExCText);
            const parser = new ShExCParser();
            const response = parser.parse(new ShExCParserRequest(ShExCText));

            if (response.error) {
                commit('setShExCError', {
                    errorMessage: response.error.message,
                    lineNo: response.error.lineNo,
                });
                commit('setParsedSchema', {});
            } else {
                commit('clearShExCError');
                commit('setParsedSchema', response.parsedSchema);
            }
        },
    },
});
