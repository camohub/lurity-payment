export default {

    namespaced: true,


    state: () => ({
        token: null,
        client: null,
        hostedFields: null,
        dropIn: null,
    }),


    mutations: {
        SET_TOKEN(state, data) {
            state.token = data
        },
        SET_CLIENT(state) {
            state.client = require('braintree-web/client');
            state.hostedFields = require('braintree-web/hosted-fields');
        },
        SET_DROP_IN(state) {
            state.dropIn = require('braintree-web-drop-in');
        },
    },


    actions: {
        setToken({commit}, token) {
            commit('SET_TOKEN', token);
        },
        setClient({commit}) {
            commit('SET_CLIENT');
        },
        setDropIn({commit}) {
            commit('SET_DROP_IN');
        },
    },


    getters: {
        getToken(state) {
            return state.token;
        },
        getClient(state) {
            return state.client;
        },
        getHostedFields(state) {
            return state.hostedFields;
        },
        getDropIn(state) {
            return state.dropIn;
        },
    }

}