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
                  <option value="text">Text / Note</option>
                  <option value="folder">Folder</option></select
                >
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
              <tree :data="treeData" :options="treeOptions" ref="tree">
                <span slot-scope="{ node }">
                  <font-awesome-icon
                    :icon="node.expanded() ? 'folder-open' : 'folder'"
                  ></font-awesome-icon>
                  {{ node.text }}
                </span>
              </tree>
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
                  v-model="linkTitle"
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
                  v-model="linkURL"
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
                  v-model="newFolderName"
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
        <button class="button is-success" @click="submitContent">
          Add&nbsp;<font-awesome-icon icon="plus-square"></font-awesome-icon>
        </button>
        <button class="button is-danger" @click="$emit('toggleModal')">
          Cancel&nbsp;<font-awesome-icon icon="ban"></font-awesome-icon>
        </button>
        {{ linkTitle }}
        {{ linkURL }}
        {{ newFolderName }}
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import ContentType from "../../../../common/types/contentType";
@Component
export default class NewContentModal extends Vue {
  @Prop({ default: false }) readonly showModal: boolean;
  @Ref("tree") readonly tree!: any;

  //Default content type is a link.
  contentType: ContentType = "link";

  linkTitle: string = "";
  linkURL: string = "";

  parentFolderID: string[] = [""];
  tags: string[] = [""];

  newFolderName: string = "";

  text: string = "";

  //TODO Tech Debt: Replace this with real folders from API
  treeData = [
    {
      text: "Home",
      children: [
        { text: "Development" },
        { text: "Random", children: [{ text: "Stuff" }] },
      ],
    },
  ];

  private readonly treeOptions = {
    checkbox: true,
    checkOnSelect: true,
    autoCheckChildren: false,
  };

  selected: any = [];

  mounted() {
    // @ts-ignore
    console.log(this.$refs.tree.checked());

    // @ts-ignore
    this.selected = this.$refs.tree.checked();
    console.log(this.selected);

    //const test = this.tree.selected();
    //console.log(test);
  }

  async submitContent(): Promise<void> {
    const selected = this.tree.selected();

    console.log(selected);

    // const resp = await fetch("/api/entries", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({}),
    // });
    // console.log(resp.json());
  }
}
</script>
