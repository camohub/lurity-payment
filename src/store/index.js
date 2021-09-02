import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import order from './modules/Order'
import brainTreeGateway from './modules/BrainTreeGateway'


export default new Vuex.Store({

    state: {
    },

    mutations: {
    },

    actions: {
    },

    modules: {
        order: order,
        brainTreeGateway: brainTreeGateway,
    }
})
