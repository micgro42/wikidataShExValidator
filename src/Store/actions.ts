import SparqlFetcher from '@/SparqlFetcher/SparqlFetcher';
import SparqlFetcherRequest from '@/SparqlFetcher/SparqlFetcherRequest';
import SparqlFetcherResponse from '@/SparqlFetcher/SparqlFetcherResponse';
import EntityInterface from '@/Store/EntityInterface';
import EntityValidator from '@/EntityValidator/EntityValidator';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import {ShExCStatus} from '@/Store/ShExCStatus';
import ShExCParser from '@/ShExCParser/ShExCParser';
import ShExCParserRequest from '@/ShExCParser/ShExCParserRequest';
import * as log from 'loglevel';
import { Commit } from 'vuex';
import StateInterface from '@/Store/StateInterface';

export default {
    setQuery({commit, state}: {commit: Commit, state: StateInterface}, query: string) {
        commit('setQuery', {query});
        commit('setQueryEntities', { entities: {} });
        const sparqlFetcher = new SparqlFetcher();
        sparqlFetcher.fetchItems(new SparqlFetcherRequest(query))
            .then((resp: SparqlFetcherResponse) => {
                commit('setQueryEntities', {
                    entities: resp.entities.reduce((carry: EntityInterface, url: string) => {
                        const entityID = url.match(/[QPL]\d+/);
                        if (entityID === null || !entityID[0]) {
                            log.warn('unexpected match for', url, entityID);
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
    updateShExC({commit}: {commit: Commit}, url: string) {
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
};
