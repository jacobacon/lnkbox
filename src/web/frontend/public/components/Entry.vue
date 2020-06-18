<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        <a :href="entry.url" v-if="type === 'link'">{{ title }}</a>
        <span v-else
          ><font-awesome-icon icon="folder"></font-awesome-icon>&nbsp;{{
            title
          }}</span
        >
      </p>
    </div>
    <footer class="card-footer" v-if="layout === 'full'">
      <!--
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
      -->
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ContentType from "../../../../common/types/contentType";
import Layout from "../../../../common/types/layout";
@Component
export default class Entry extends Vue {
  @Prop({ default: "full" }) readonly layout: Layout;
  @Prop({ default: {} }) readonly entry: any;
  type: ContentType = this.entry.contentType;

  title: string = "";

  created() {
    this.title = this.entry.title || this.entry.url;
  }
}
</script>
