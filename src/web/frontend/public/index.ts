import "bulma/bulma.sass";
import "./style/main.scss";
import "./style/_base.scss";
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#vue");
