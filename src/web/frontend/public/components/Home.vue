<template>
  <div class="container" :class="this.layout">
    <div v-for="n in 35" :key="n">
      <router-link :to="String(n)">
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
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Layout from "../../../../common/types/layout";
@Component
export default class Home extends Vue {
  @Prop({ default: "full" }) readonly layout: Layout;
}
</script>
<style lang="scss" scoped>
@import "../style/_base.scss";

.container {
  display: grid;
  gap: 1rem;
  padding: 2rem;
}

.compact {
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  .card-content p {
    font-size: 1rem;
  }
}

.full {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.table {
  grid-template-columns: 1fr;
}
</style>
