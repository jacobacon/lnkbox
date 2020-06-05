<template>
  <div class="modal" :class="this.showModal ? 'is-active fadeIn' : 'fadeOut'">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <font-awesome-icon icon="plus-square"></font-awesome-icon>&nbsp;Add
          new {{ contentType }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('toggleModal')"
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
                  <option value="text">Text</option>
                  <option value="folder">Folder</option></select
                >
              </span>
            </p>
          </div>
        </div>
        <div v-if="contentType === 'link'">
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
                />
              </p>
            </div>
          </div>
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
                />
              </p>
            </div>
          </div>
        </div>
        <div v-if="contentType === 'folder'">
          FOLDER
        </div>
        <div v-if="contentType === 'text'">
          TEXT
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="submitContent">
          Add
        </button>
        <button class="button" @click="$emit('toggleModal')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ContentType from "../../../../common/types/contentType";
@Component
export default class NewContentModal extends Vue {
  @Prop({ default: false }) readonly showModal: boolean;

  contentType: ContentType = "link";

  async submitContent(): Promise<void> {
    const resp = await fetch("/api/entries");
    console.log(resp.json());
  }
}
</script>
