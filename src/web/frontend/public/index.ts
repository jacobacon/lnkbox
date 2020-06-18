import "./style/main.scss";
import "./style/_base.scss";

import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "./components/Home.vue";
import Entry from "./components/Entry.vue";

import entries from "../store/entries";

import axios from "axios";
import * as VueAxios from "vue-axios";

//@ts-ignore This wrapper has issues with Typescript
Vue.use(VueAxios, axios);

const routes = [
  { name: "home", path: "/", component: Home },
  { path: "/:entryID", component: Entry },
  {
    path: "/:folderID/:entryID",
    component: Entry,
  },
];

const router = new VueRouter({ routes });
import Vuex from "vuex";

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

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { entries },
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
  router,
}).$mount("#vue");
