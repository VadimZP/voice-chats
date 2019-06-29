import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/userModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
