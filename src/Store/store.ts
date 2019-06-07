import Vue from 'vue';
import Vuex from 'vuex';
import EntityInterface from '@/Store/EntityInterface';
import { ShExCStatus } from '@/Store/ShExCStatus';
import { ValidationStatus } from '@/Store/ValidationStatus';
import StateInterface from '@/Store/StateInterface';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Query: '',
        QueryEntities: {},
        QueryError: '',
        ShemaParsed: {},
        ShExC: '',
        ShExCStatus: ShExCStatus.none,
        ShExCParseError: {
            message: '',
            lineNo: -1,
        },
    } as StateInterface,
    getters: {
        getShExCStatus(state): ShExCStatus {
            return state.ShExCStatus;
        },
        getShExCParseError(state) {
            return state.ShExCParseError;
        },
        getQueryError(state) {
            return state.QueryError;
        },
        getQueryEntities(state) {
            return state.QueryEntities;
        },
        getQueryEntitiesLength(state) {
            return Object.keys(state.QueryEntities).length;
        },
    },
    mutations: {
        setQuery(state, payload: { query: string }) {
            state.Query = payload.query;
        },
        setQueryEntities(state, payload: { entities: EntityInterface }) {
            state.QueryEntities = payload.entities;
        },
        setQueryError(state, errorMsg) {
            state.QueryError = errorMsg;
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
    actions,
});
