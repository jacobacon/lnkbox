import "./style/main.scss";
import "./style/_base.scss";

import Vue from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faCog,
  faBox,
  faHome,
  faFolder,
  faFolderPlus,
  faFolderMinus,
  faList,
  faThLarge,
  faTh,
  faThList,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCog,
  faBox,
  faHome,
  faFolderMinus,
  faFolderPlus,
  faFolder,
  faList,
  faThList,
  faThLarge,
  faTh
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#vue");
