<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        <a :href="entry.url" v-if="type === 'link'">
          <font-awesome-icon icon="link"></font-awesome-icon>&nbsp;
          <span>
            {{
            title
            }}
          </span>
        </a>
        <!-- Create a link to EntryPage to view the contents of the folder. -->

        <router-link v-else :to="'/folder/' + entry.$loki">
          <font-awesome-icon icon="folder"></font-awesome-icon>&nbsp;
          <span>
            {{
            title
            }}
          </span>
        </router-link>
      </p>
      <hr />
      <p class="subtitle">
        <span class="tag" v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
      </p>
    </div>
    <footer class="card-footer" v-if="layout === 'full'">
      <span class="card-footer-item" v-if="entry.contentType === 'link'">
        <a :href="this.entry.url">Hyperlink</a>
      </span>

      <span class="card-footer-item">
        <router-link :to="'/' + this.entry.$loki">Permalink</router-link>
      </span>

      <span class="card-footer-item">
        <a>Test</a>
      </span>
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
    this.title = this.entry.title;
  }

  get folderLink() {
    let id = this.entry.$loki;
    return id;
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  display: flex;
  justify-content: center;
  .tag {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.title {
  a {
    color: black;
  }
  span:hover {
    text-decoration: underline;
  }
}
</style>
