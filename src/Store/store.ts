import Vue from 'vue';
import Vuex from 'vuex';
import ShExCParser from '../ShExCParser/ShExCParser';
import ShExCParserRequest from '../ShExCParser/ShExCParserRequest';
import SparqlFetcher from '@/SparqlFetcher/SparqlFetcher';
import SparqlFetcherRequest from '@/SparqlFetcher/SparqlFetcherRequest';
import SparqlFetcherResponse from '@/SparqlFetcher/SparqlFetcherResponse';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Query: '',
        QueryEntities: [] as string[],
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
        setQuery({commit}, query: string) {
            commit('setQuery', {query});
            const sparqlFetcher = new SparqlFetcher();
            sparqlFetcher.fetchItems(new SparqlFetcherRequest(query))
                .then((resp: SparqlFetcherResponse) => commit('setQueryEntities', {entities: resp.entities}));
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
