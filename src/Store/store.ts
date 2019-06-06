import * as log from 'loglevel';
import Vue from 'vue';
import Vuex from 'vuex';
import EntityValidator from '@/EntityValidator/EntityValidator';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import SparqlFetcher from '@/SparqlFetcher/SparqlFetcher';
import SparqlFetcherRequest from '@/SparqlFetcher/SparqlFetcherRequest';
import SparqlFetcherResponse from '@/SparqlFetcher/SparqlFetcherResponse';
import EntityInterface from '@/Store/EntityInterface';
import { ShExCStatus } from '@/Store/ShExCStatus';
import { ValidationStatus } from '@/Store/ValidationStatus';
import ShExCParser from '../ShExCParser/ShExCParser';
import ShExCParserRequest from '../ShExCParser/ShExCParserRequest';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Query: '',
        QueryEntities: {} as EntityInterface,
        ShemaParsed: {},
        ShExC: '',
        ShExCStatus: ShExCStatus.none,
        ShExCParseError: {
            message: '',
            lineNo: -1,
        },
    },
    getters: {
        getShExCStatus(state): ShExCStatus {
            return state.ShExCStatus;
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
        setEntityData(state, payload: { id: string, status: ValidationStatus, error: any }) {
            state.QueryEntities[payload.id] = {
                ...state.QueryEntities[payload.id],
                status: payload.status,
                error: payload.error,
            };
        },
        setShExCStatus(state, newStatus: ShExCStatus) {
            state.ShExCStatus = newStatus;
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
                                // FIXME: use proper logging!
                                /* tslint:disable-next-line */
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
                            id,
                            status: response.status,
                            error: response.errorMessage,
                        });
                    }
                });
        },
        updateShExC({commit}, url) {
            commit('setShExCStatus', ShExCStatus.loading);

            fetch(url)
                .then((response) => response.text(), (error) => {
                    // ToDo: ensure html status and content type
                    commit('setShExCStatus', ShExCStatus.loadingError);
                    throw error;
                })
                .then((ShExCText) => {
                    commit('setShExCStatus', ShExCStatus.inProgress);
                    const parser = new ShExCParser();
                    const response = parser.parse(new ShExCParserRequest(ShExCText));

                    if (response.error) {
                        commit('setShExCStatus', ShExCStatus.invalid);
                        commit('setShExCError', {
                            errorMessage: response.error.message,
                            lineNo: response.error.lineNo,
                        });
                        commit('setParsedSchema', {});
                    } else {
                        commit('setShExCStatus', ShExCStatus.valid);
                        commit('clearShExCError');
                        commit('setParsedSchema', response.parsedSchema);
                    }
                })
                .catch((error) => log.error(error));
        },
    },
});
