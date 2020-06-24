<template>
  <div class="container">
    {{ entry }}
    <span style="color: red">{{ $route.path }}</span>
    <Entry v-if="entry" :entry="entry"></Entry>
    <div v-if="loading" style="color: red">Loading...</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Entry from "./Entry.vue";
import EntryType from "../../../../common/interfaces/entry";
@Component({ components: { Entry } })
export default class EntryPage extends Vue {
  loading: boolean = true;
  entry: any;

  created() {
    this.getEntry();
  }

  async getEntry() {
    this.axios
      .get(`/api/entries/${this.$route.path}`)
      .then(resp => {
        this.loading = false;

        this.entry = resp.data.response.data;
      })
      .catch(err => {
        alert(err);
      });
  }
}
</script>
