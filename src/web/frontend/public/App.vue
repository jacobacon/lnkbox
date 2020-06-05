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
    <div class="container" :class="this.layout">
      <div v-for="n in 35" :key="n">
        <div class="card">
          <div class="card-content">
            <p class="title">
              “There are two hard things in computer science: cache
              invalidation, naming things, and off-by-one errors.”
            </p>
            <p class="subtitle">Jeff Atwood</p>
          </div>
          <footer class="card-footer" v-if="layout === 'full'">
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
              <span>
                Share on
                <a href="#">Facebook</a>
              </span>
            </p>
          </footer>
        </div>
      </div>
    </div>
    <NewContentModal
      :showModal="showModal"
      v-on:toggleModal="showModal = !showModal"
    ></NewContentModal>
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

<style lang="scss">
@import "./style/_base.scss";

.container {
  display: grid;
  gap: 1rem;
  padding: 2rem;
}

.compact {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  .card-content p {
    font-size: 1rem;
  }
}

.full {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.table {
  grid-template-columns: 1fr;
}

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
