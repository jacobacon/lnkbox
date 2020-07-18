<template>
  <div>
    <Navbar v-on:layoutChange="layoutChange($event)" v-on:toggleModal="showModal = !showModal"></Navbar>
    <Breadcrumbs></Breadcrumbs>
    <hr />
    <router-view :layout="layout"></router-view>
    <NewContentModal
      :showModal="showModal"
      v-on:toggleModal="showModal = !showModal"
      v-on:success="showModal = !showModal"
    ></NewContentModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import NewContentModal from "./components/NewContentModal.vue";
import Breadcrumbs from "./components/Breadcrumbs.vue";
import Layout from "../../../common/types/layout";

@Component({
  components: { Navbar, NewContentModal, Breadcrumbs }
})
export default class App extends Vue {
  layout: Layout = "full";
  showModal: boolean = false;

  layoutChange(newLayout: Layout): void {
    this.layout = newLayout;
  }

  created() {
    //Get entries from root, and store them in vuex store.
    this.axios
      .get("/api/entries?parentID=root")
      .then(res => {
        this.$store.dispatch("addNewEntries", res.data.response.data);
      })
      .catch(err => {
        alert(err);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "./style/_base.scss";

hr {
  margin-left: auto;
  margin-right: auto;
  width: 95vw;
  height: 1px;
  color: $divider-color !important;
}
</style>
