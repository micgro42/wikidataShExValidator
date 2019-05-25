import Vue from 'vue';
import Vuex from 'vuex';
import ShExCParser from '../ShExCParser/ShExCParser';
import ShExCParserRequest from '../ShExCParser/ShExCParserRequest';
import {ShExCParseStatus} from './ShExCParseStatus';
import SparqlFetcher from '@/SparqlFetcher/SparqlFetcher';
import SparqlFetcherRequest from '@/SparqlFetcher/SparqlFetcherRequest';
import SparqlFetcherResponse from '@/SparqlFetcher/SparqlFetcherResponse';
import EntityValidator from '@/EntityValidator/EntityValidator';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import EntityInterface from '@/Store/EntityInterface';
import {ValidationStatus} from '@/Store/ValidationStatus';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Query: '',
        QueryEntities: {} as EntityInterface,
        ShemaParsed: {},
        ShExC: '',
        ShExCParseStatus: ShExCParseStatus.none,
        ShExCParseError: {
            message: '',
            lineNo: -1,
        },
    },
    getters: {
        getShExCParseStatus(state): ShExCParseStatus {
            return state.ShExCParseStatus;
        },
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
        setQueryEntities(state, payload: { entities: EntityInterface }) {
            state.QueryEntities = payload.entities;
        },
        setEntityData(state, payload: {id: string, status: ValidationStatus, errors: any}) {
            state.QueryEntities[payload.id] = {
                ...state.QueryEntities[payload.id],
                status: payload.status,
                errors: payload.errors,
            };
        },
        setShExC(state, ShExCText) {
            state.ShExC = ShExCText;
        },
        setShExCParseStatus(state, newStatus: ShExCParseStatus) {
            state.ShExCParseStatus = newStatus;
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
                        entities: resp.entities.reduce((carry: EntityInterface, url: string) => {
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
                    for (const [id, {url}] of Object.entries(state.QueryEntities)) {
                        const response = await validator.validate(new EntityValidatorRequest(id, url));
                        commit('setEntityData', {
                            id: id,
                            status: response.status,
                            errors: response.errors,
                        });
                    }
                });
        },
        setShExC({commit}, ShExCText: string) {
            commit('setShExC', ShExCText);
            if (ShExCText === '') {
                commit('setShExCParseStatus', ShExCParseStatus.none);
                return;
            }
            commit('setShExCParseStatus', ShExCParseStatus.inProgress);
            const parser = new ShExCParser();
            const response = parser.parse(new ShExCParserRequest(ShExCText));

            if (response.error) {
                commit('setShExCParseStatus', ShExCParseStatus.invalid);
                commit('setShExCError', {
                    errorMessage: response.error.message,
                    lineNo: response.error.lineNo,
                });
                commit('setParsedSchema', {});
            } else {
                commit('setShExCParseStatus', ShExCParseStatus.valid);
                commit('clearShExCError');
                commit('setParsedSchema', response.parsedSchema);
            }
        },
    },
});
