import Entry from "../../../common/interfaces/entry";
import axios from "axios";

const entriesModule = {
  state: () => ({
    rootEntries: [],
    childEntries: [],
    loadedEntry: {},
  }),
  //Mutations are commited to change the state
  mutations: {
    addEntries(state, newEntries) {
      state.rootEntries.push(...newEntries);
    },
    setLoadedEntry(state, entry) {
      state.loadedEntry = entry;
    },
  },
  //Actions are dispatched & commit mutations
  actions: {
    addNewEntries({ commit }, newEntries: [Entry]) {
      commit("addEntries", newEntries);
    },
    addNewEntry({ commit }, newEntry: Entry) {
      commit("addEntries", [newEntry]);
    },
    loadEntry({ commit }, entryID: number) {
      axios
        .get(`/api/entries/${entryID}`)
        .then((resp) => {
          this.loading = false;

          commit("setLoadedEntry", resp.data.response.data);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};

export default entriesModule;
