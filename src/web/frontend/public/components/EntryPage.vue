<template>
  <div>
    Hello! {{ $route.path }}
    <Entry></Entry>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Entry from "./Entry.vue";
@Component({ components: { Entry } })
export default class EntryPage extends Vue {}
</script>
