import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

let store = new Vuex.Store({
    state,
    getters,
    mutations,
    plugins: [createLogger()]
});

export default store;
