import "./style/main.scss";
import "./style/_base.scss";

import Vue from "vue";
import App from "./App.vue";

//Setup FontAwesome
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
  faLink,
  faPlusSquare,
  faBan,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCog,
  faBox,
  faHome,
  faFolderMinus,
  faFolderPlus,
  faFolder,
  faFolderOpen,
  faList,
  faThList,
  faThLarge,
  faTh,
  faLink,
  faPlusSquare,
  faBan
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

//Setup LiquorTree
import LiquorTree from "liquor-tree";

Vue.use(LiquorTree);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#vue");
