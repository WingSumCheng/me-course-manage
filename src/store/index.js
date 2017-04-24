const state = require("./state.js");
const getters = require("./getters.js");
const mutations = require("./mutations.js");
const actions = require("./actions.js");

const Vue = require("vue");
const Vuex = require("vuex");
Vue.use(Vuex);

const user = require("./modules/user");
const lesson = require("./modules/lesson");

const store = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {
    	user: user,
    	lesson: lesson
    }
});

module.exports = store;
