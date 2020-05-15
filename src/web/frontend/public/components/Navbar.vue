<template>
  <div>
    {{ this.clicks }}
    <button @click="addClick" class="button">Increase Number</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  clicks = 0;

  addClick() {
    this.clicks++;
  }
}
</script>

<style lang="scss">
@import "../style/_base.scss";
.navbar {
  background-color: $primary-color-dark;
}
</style>
