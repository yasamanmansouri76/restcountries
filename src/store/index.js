import Vue from "vue";
import Vuex from "vuex";
import country from "./country";
import enums from "./enums";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    country,
    enums,
  },
});
