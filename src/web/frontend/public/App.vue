<template>
  <div>
    <Navbar v-on:layoutChange="layoutChange($event)"></Navbar>
    <nav class="breadcrumb boxBreadcrumbs" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#"
            ><font-awesome-icon icon="home"></font-awesome-icon>&nbsp;Home</a
          >
        </li>
        <li>
          <a href="#"
            ><font-awesome-icon icon="folder"></font-awesome-icon
            >&nbsp;Development</a
          >
        </li>
      </ul>
    </nav>
    <hr />
    <div class="container">
      <div class="columns">
        <div v-for="n in 4" :key="n" class="column">
          <div class="card">
            <div class="card-content">
              <p class="title">
                “There are two hard things in computer science: cache
                invalidation, naming things, and off-by-one errors.”
              </p>
              <p class="subtitle">
                Jeff Atwood
              </p>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  View on
                  <a
                    href="https://twitter.com/codinghorror/status/506010907021828096"
                    >Twitter</a
                  >
                </span>
              </p>
              <p class="card-footer-item">
                <span> Share on <a href="#">Facebook</a> </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import Layout from "../../../common/types/layout";

@Component({
  components: { Navbar },
})
export default class App extends Vue {
  layout: Layout = "full";

  layoutChange(newLayout: Layout): void {
    this.layout = newLayout;
  }
}
</script>

<style lang="scss">
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
