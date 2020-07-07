<template>
  <div class="modal" :class="this.showModal ? 'is-active fadeIn' : 'fadeOut'">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <font-awesome-icon icon="plus-square"></font-awesome-icon>
          &nbsp;Add new {{ contentType }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal()"
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal has-addons has-addons-centered">
          <div class="field-label is-normal">
            <label class="label">Content</label>
          </div>
          <div class="field-body">
            <p class="control is-expanded">
              <span class="select is-fullwidth">
                <select v-model="contentType">
                  <option selected value="link">Link</option>
                  <option value="text">Text / Note</option>
                  <option value="folder">Folder</option>
                </select>
              </span>
            </p>
          </div>
        </div>
        <div class="field is-horizontal has-addons has-addons-centered">
          <div class="field-label is-normal">
            <label class="label">Parent Folder(s)</label>
          </div>
          <div class="field-body">
            <p class="control is-expanded">
              <!-- Folder tree goes here! -->
              <treeselect
                :options="options"
                :multiple="contentType !== 'folder'"
                v-model="selectedFolders"
                :loadOptions="loadFolderTree"
                :flat="true"
              ></treeselect>
            </p>
          </div>
        </div>
        <div v-if="contentType === 'link'">
          <div class="field is-horizontal has-addons has-addons-centered">
            <div class="field-label is-normal">
              <label class="label">URL</label>
            </div>
            <div class="field-body">
              <p class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="https://www.example.com"
                  v-model="linkURL"
                />
              </p>
            </div>
          </div>
          <div class="field is-horizontal has-addons has-addons-centered">
            <div class="field-label is-normal">
              <label class="label">Title</label>
            </div>
            <div class="field-body">
              <p class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="Super cool site!"
                  v-model="entryTitle"
                />
              </p>
            </div>
          </div>
        </div>
        <div v-if="contentType === 'folder'">
          <div class="field is-horizontal has-addons has-addons-centered">
            <div class="field-label is-normal">
              <label class="label">Folder Name</label>
            </div>
            <div class="field-body">
              <p class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="My New Folder"
                  v-model="entryTitle"
                />
              </p>
            </div>
          </div>
        </div>
        <div v-if="contentType === 'text'">
          <div class="field is-horizontal">
            <div class="field-label is-normal"></div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="The quick brown fox jumped over the lazy dog."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="new-entry-buttons">
          <div class="buttons has-addons is-right">
            <button
              class="button is-success"
              @click="submitContent"
              :disabled="!isFormValid"
            >
              Add&nbsp;
              <font-awesome-icon icon="plus-square"></font-awesome-icon>
            </button>
            <button class="button is-danger" @click="closeModal">
              Cancel&nbsp;
              <font-awesome-icon icon="ban"></font-awesome-icon>
            </button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import ContentType from "../../../../common/types/contentType";
import Entry from "../../../../common/interfaces/entry";
import LinkEntry from "../../../../common/classes/linkEntry";
import FolderEntry from "../../../../common/classes/folderEntry";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { isUrl } from "../../../../common/helpers/validation";
@Component({ components: { Treeselect } })
export default class NewContentModal extends Vue {
  @Prop({ default: false }) readonly showModal: boolean;

  //Default content type is a link.
  contentType: ContentType = "link";

  entryTitle: string = ""; // For links, this is the title of the URL, for folders it's the name of the folder.
  linkURL: string = "";

  parentFolderID: string[] = ["root"];
  tags: string[] = [];

  text: string = "";

  selectedFolders: string[] = [];

  options = null;

  get validateUrl(): boolean {
    return isUrl(this.linkURL);
  }

  get isFormValid(): boolean {
    let result = false;
    if (this.contentType === "link") {
      result = this.validateUrl;
    } else if (this.contentType === "folder") {
      result = this.entryTitle !== "";
    }
    return result;
  }

  async submitContent(): Promise<void> {
    // Create a new Entry object based on contentType
    let newEntry: Entry;

    if (this.contentType === "link") {
      newEntry = new LinkEntry(this.linkURL, 1, {
        title: this.entryTitle,
        parentID: this.parentFolderID,
        tags: this.tags,
      });
    } else if (this.contentType === "folder") {
      newEntry = new FolderEntry(this.entryTitle, 1, {
        tags: this.tags,
        parentID: this.parentFolderID,
      });
    }

    // POST the newEntry to API
    if (newEntry !== undefined) {
      this.axios
        .post("/api/entries", newEntry)
        .then((res) => {
          this.$store.dispatch("addNewEntry", newEntry);
          this.$emit("success", newEntry);
          console.log(res);
        })
        .finally(() => {
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Load and format folders for tree selection
  async loadFolderTree({ action, parentNode }): Promise<void> {
    // Load folders for ("root")
    if (action === "LOAD_ROOT_OPTIONS") {
      let resp = await this.axios.get(
        "/api/entries?contentType=folder&parentID=root"
      );

      const folders = resp.data.response.data;

      let children = folders.map((folder) => ({
        id: folder.$loki,
        label: folder.title,
        children: null,
      }));

      this.options = [{ id: "root", label: "Home", children: children }];
    }

    // Load a folders children, and add their elements to the parent node.
    if (action === "LOAD_CHILDREN_OPTIONS") {
      let resp = await this.axios.get(
        `/api/entries?contentType=folder&parentID=${parentNode.id}`
      );

      const folders = resp.data.response.data;

      const children = folders.map((folder) => ({
        id: folder.$loki,
        label: folder.title,
        children: null,
      }));
      parentNode.children = children;
    }

    return;
  }

  closeModal(): void {
    this.resetForm();
    this.$emit("toggleModal");
  }

  //Resets all form elements to default
  resetForm(): void {
    this.contentType = "link";

    this.entryTitle = "";
    this.linkURL = "";

    this.parentFolderID = ["root"];
    this.tags = [];

    this.text = "";
  }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  display: flex;
  justify-content: flex-end;
}
</style>
