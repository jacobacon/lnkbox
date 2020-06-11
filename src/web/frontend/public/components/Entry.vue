<template>
  <div>
    <div>Entry</div>
    {{ $route.params.entryID }}

    <div v-if="$route.params.folderID">
      Folder: {{ $route.params.folderID }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContentType from "../../../../common/types/contentType";
@Component
export default class Entry extends Vue {
  type: ContentType = "link";
}
</script>
