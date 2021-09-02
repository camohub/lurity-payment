export default {

    namespaced: true,


    state: () => ({
        token: null,
        client: null,
        hostedFields: null,
    }),


    mutations: {
        SET_TOKEN(state, data) {
            state.token = data
        },
        SET_CLIENT(state) {
            state.client = require('braintree-web/client');
            state.hostedFields = require('braintree-web/hosted-fields');
        },
    },


    actions: {
        setToken({commit}, token) {
            commit('SET_TOKEN', token);
        },
        setClient({commit}) {
            commit('SET_CLIENT');
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
    }

}