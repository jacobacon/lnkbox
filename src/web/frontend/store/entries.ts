import Entry from "../../../common/interfaces/entry";

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
    loadEntry({ commit }, newEntry: Entry) {
      commit("setLoadedEntry", newEntry);
    },
  },
};

export default entriesModule;
