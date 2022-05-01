import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import ClickOutside from "vue-click-outside";

Vue.config.productionTip = false;

Vue.use(ClickOutside);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
