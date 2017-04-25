// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
const Vue = require('vue');
const App = require('./App');
const router = require('./router');
const store = require("./store");
const eventproxy = require('eventproxy');
const moment = require('moment');

window.eventproxy = eventproxy;
window.moment = moment;
console.log(router);
require("./common");
require("./style/index.less");

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});