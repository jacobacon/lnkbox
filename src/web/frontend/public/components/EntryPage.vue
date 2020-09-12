<template>
  <div class="container">
    <div v-if="entry" class="level">
      <h1 class="title is-1">{{entry.title}}</h1>
    </div>

    <hr />
    <div v-if="loading" style="color: red">Loading...</div>
    <div class="folder-contents">
      <div v-for="entry in childEntries" :key="entry.$loki">
        <Entry :entry="entry"></Entry>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Entry from "./Entry.vue";
import EntryType from "../../../../common/interfaces/entry";
@Component({ components: { Entry } })
export default class EntryPage extends Vue {
  loading: boolean = true;

  folderID: number = null;

  childEntries: [any] = null;

  get entry(): Entry {
    return this.$store.state.entries.loadedEntry;
  }

  created() {
    this.folderID = this.getEntryID();
    this.getEntry();
    this.getChildren();
  }

  @Watch("$route")
  async getEntry() {
    this.$store.dispatch("loadEntry", this.getEntryID());
    this.loading = false;
  }

  @Watch("$route")
  async getChildren() {
    this.axios
      .get(`/api/entries?parentID=${this.getEntryID()}`)
      .then(resp => {
        this.childEntries = resp.data.response.data;
      })
      .catch(err => {
        alert(err);
      });
  }

  getEntryID(): number {
    return Number(this.$route.path.split("/").slice(-1)[0]);
  }
}
</script>

<style lang="scss">
.folder-contents {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1em;
}
</style>
