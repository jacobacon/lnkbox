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
          &nbsp;{{ folder[0].toUpperCase() + folder.slice(1) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Breadcrumbs extends Vue {
  folders = ["test", "development", "meow"];
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
