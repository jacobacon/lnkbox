<template>
  <div class="card">
    <!-- Card Management menu -->
    <div v-if="showMenu" id="menu" :class="showConfirmDeleteMenu ? 'blur' : ''">
      <button class="button is-warning is-small mb-3">Edit</button>
      <button
        class="button is-danger is-small"
        @click="showConfirmDeleteMenu = !showConfirmDeleteMenu"
      >
        Delete
      </button>
    </div>
    <div v-if="showConfirmDeleteMenu" id="confirm_delete_menu">
      <label>Confirm Delete&nbsp;</label
      ><button class="button is-small is-danger">Yes</button
      ><button class="button is-small is-success ml-2">No</button>
    </div>
    <header class="card-header">
      <p class="card-header-title">
        <a :href="hyperLink" v-if="type === 'link'">
          <font-awesome-icon icon="link"></font-awesome-icon>&nbsp;
          <span>{{ title }}</span>
        </a>
        <!-- Create a link to EntryPage to view the contents of the folder. -->

        <router-link v-else :to="'/folder/' + entry.$loki">
          <font-awesome-icon icon="folder"></font-awesome-icon>&nbsp;
          <span>{{ title }}</span>
        </router-link>
      </p>
      <div class="card-header-icon" @click="toggleMenu">
        <font-awesome-icon icon="ellipsis-v"></font-awesome-icon>
      </div>
    </header>
    <div class="card-content">
      <hr />
      <p class="subtitle">
        <span class="tag" v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
      </p>
    </div>
    <footer class="card-footer" v-if="layout === 'full'">
      <span class="card-footer-item" v-if="entry.contentType === 'link'">
        <a :href="hyperLink">Hyperlink</a>
      </span>

      <span class="card-footer-item">
        <router-link :to="'/' + this.entry.$loki">Permalink</router-link>
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
  showMenu: boolean = false;
  showConfirmDeleteMenu: boolean = false;

  created() {
    this.title = this.entry.title;
  }

  get folderLink(): number {
    let id = this.entry.$loki;
    return id;
  }

  get hyperLink(): string {
    if (this.entry.url.includes("//")) {
      return this.entry.url;
    } else {
      return `//${this.entry.url}`;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
</script>

<style lang="scss" scoped>
@import "../style/base";
.subtitle {
  display: flex;
  justify-content: center;
  .tag {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.card {
  a {
    font-weight: bold;
    color: initial;
  }
}

.card-header-title {
  a {
    color: black;
  }
  span:hover {
    text-decoration: underline;
  }
}

.blur {
  -webkit-filter: blur(1px);
  -moz-filter: blur(1px);
  -o-filter: blur(1px);
  -ms-filter: blur(1px);
  filter: blur(1px);
}

#menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  background: whitesmoke;
  border-radius: 2px;
  border-width: 1px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  top: 25px;
  right: 40px;
  z-index: 1;

  padding: 5px;
}

#confirm_delete_menu {
  display: flex;
  position: absolute;

  background: whitesmoke;
  border-radius: 2px;
  border-width: 1px;
  padding: 5px;
  z-index: 3;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  top: 50px;
  right: 15px;
}
</style>
