import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import order from './modules/Order'


export default new Vuex.Store({

    state: {
    },

    mutations: {
    },

    actions: {
    },

    modules: {
        order: order,
    }
})
