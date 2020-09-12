<template>
  <nav class="breadcrumb boxBreadcrumbs" aria-label="breadcrumbs">
    <ul>
      <li>
        <a href="/">
          <font-awesome-icon icon="home"></font-awesome-icon>&nbsp;Home
        </a>
      </li>
      <li v-for="folder in folders" :key="folder">
        <a href="#">
          <font-awesome-icon icon="folder"></font-awesome-icon>
          &nbsp;{{ folder.title[0].toUpperCase() + folder.slice(1) }}
        </a>
      </li>
    </ul>
    {{ folders }}
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Entry from "../../../../common/interfaces/entry";

@Component
export default class Breadcrumbs extends Vue {
  //folders: Entry[] = [];
  folders: any = [];

  async mounted(): Promise<void> {
    this.loadParents();
  }
  @Watch("$route")
  async loadParents(): Promise<void> {
    console.log(this.$route);
    if (this.$route.name !== "/") {
      const loadedFolder = this.$store.state.entries.loadedEntry;

      console.log("Loaded Folder:", loadedFolder);
      const loadedFolderID = Number(loadedFolder.$loki + "");

      console.log(loadedFolderID);
      const apiResponse = await this.axios.get(`/api/entries/${4}/parents`);

      this.folders = apiResponse.data;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/_base.scss";
.boxBreadcrumbs {
  padding: 20px 0px 0px 10px;
  margin-bottom: 0px;
  a {
    color: $primary-color-text;
  }
}
</style>
