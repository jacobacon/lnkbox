import Entry from "../../../common/interfaces/entry";

const entriesModule = {
  state: () => ({
    rootEntries: [],
    childEntries: [],
  }),
  //Mutations are commited to change the state
  mutations: {
    addEntries(state, newEntries) {
      state.rootEntries.push(...newEntries);
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
  },
};

export default entriesModule;
