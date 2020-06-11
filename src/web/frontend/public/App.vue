<template>
  <div>
    <Navbar
      v-on:layoutChange="layoutChange($event)"
      v-on:toggleModal="showModal = !showModal"
    ></Navbar>
    <nav class="breadcrumb boxBreadcrumbs" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="/">
            <font-awesome-icon icon="home"></font-awesome-icon>&nbsp;Home
          </a>
        </li>
        <li>
          <a href="#">
            <font-awesome-icon icon="folder"></font-awesome-icon
            >&nbsp;Development
          </a>
        </li>
      </ul>
    </nav>
    <hr />
    <router-view :layout="layout"></router-view>
    <NewContentModal
      :showModal="showModal"
      v-on:toggleModal="showModal = !showModal"
    ></NewContentModal>
    <router-link to="foo">Go to Foo</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import NewContentModal from "./components/NewContentModal.vue";
import Layout from "../../../common/types/layout";

@Component({
  components: { Navbar, NewContentModal },
})
export default class App extends Vue {
  layout: Layout = "full";
  showModal: boolean = false;

  layoutChange(newLayout: Layout): void {
    this.layout = newLayout;
  }
}
</script>

<style lang="scss" scoped>
@import "./style/_base.scss";
.boxBreadcrumbs {
  padding: 20px 0px 0px 10px;
  margin-bottom: 0px;
  a {
    color: $primary-color-text;
  }
}
hr {
  margin-left: auto;
  margin-right: auto;
  width: 95vw;
  height: 1px;
  color: $divider-color !important;
}
</style>
