<template>
  <router-link to="/entry">
    <div class="card">
      <div class="card-content">
        <p class="title">
          “There are two hard things in computer science: cache invalidation,
          naming things, and off-by-one errors.”
        </p>
        <p class="subtitle">Jeff Atwood</p>
      </div>
      <footer class="card-footer" v-if="layout === 'full'">
        <p class="card-footer-item">
          <span>
            View on
            <a href="https://twitter.com/codinghorror/status/506010907021828096"
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ContentType from "../../../../common/types/contentType";
import Layout from "../../../../common/types/layout";
@Component
export default class Entry extends Vue {
  @Prop({ default: "full" }) readonly layout: Layout;
  type: ContentType = "link";
}
</script>
