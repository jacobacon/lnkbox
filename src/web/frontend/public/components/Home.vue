<template>
  <div>
    <div v-if="entries.length === 0" class="empty-container">
      <div class="empty">Nothing here!</div>
    </div>
    <div class="content" :class="this.layout" v-if="layout !== 'table'">
      <div v-for="entry in entries" :key="entry.$loki">
        <Entry :layout="layout" :entry="entry" class="entry"></Entry>
      </div>
    </div>
    <div v-else-if="layout === 'table'" class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Tags</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Layout from "../../../../common/types/layout";
import Entry from "../components/Entry.vue";
@Component({
  components: { Entry }
})
export default class Home extends Vue {
  @Prop({ default: "full" }) readonly layout: Layout;

  get entries() {
    return this.$store.state.entries.rootEntries;
  }
}
</script>
<style lang="scss">
@import "../style/_base.scss";

.content {
  display: grid;
  gap: 1rem;
  padding-left: 15px;
  padding-right: 15px;
}

.compact {
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  .card-content p {
    font-size: 1rem;
  }
}

.full {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.table-container {
  min-width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
}

.empty-container {
  display: flex;
  justify-content: center;
}

.empty {
  font-size: 3rem;
}
</style>
