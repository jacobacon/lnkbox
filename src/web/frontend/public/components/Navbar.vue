<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="../../../../common/assets/logo.svg" />
        &nbsp;&nbsp;
        <strong>LnkBox</strong>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarContent" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/">
          Home
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field has-addons">
            <p class="control">
              <button
                class="button is-light"
                @click="setLayout('full')"
                :class="layout === 'full' ? 'is-active' : ''"
              >
                <font-awesome-icon icon="th-large"></font-awesome-icon>
              </button>
            </p>
            <p class="control">
              <button
                class="button is-light"
                @click="setLayout('compact')"
                :class="layout === 'compact' ? 'is-active' : ''"
              >
                <font-awesome-icon icon="th"></font-awesome-icon>
              </button>
            </p>
            <p class="control">
              <button
                class="button is-light"
                @click="setLayout('table')"
                :class="layout === 'table' ? 'is-active' : ''"
              >
                <font-awesome-icon icon="th-list"></font-awesome-icon>
              </button>
            </p>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button" id="add-content-button">
              <strong>Add to Box</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Layout from "../../../../common/types/layout";

@Component
export default class Navbar extends Vue {
  layout: Layout = "full";

  setLayout(newLayout: Layout): void {
    this.$emit("layoutChange", newLayout);
    this.layout = newLayout;
  }
}
</script>

<style lang="scss">
@import "../style/_base.scss";
.navbar {
  background-color: $primary-color-dark;
  a {
    color: $primary-color-text;
  }
  .navbar-link::after {
    border-color: $primary-color-text;
  }

  #add-content-button {
    background-color: $accent-color;
  }
}
</style>
