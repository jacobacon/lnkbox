const entriesModule = {
  state: () => ({
    rootEntries: [],
  }),
  //Mutations are commited to change the state
  mutations: {
    addEntries(state, newEntries) {
      state.rootEntries.push(...newEntries);
    },
  },
  //Actions are dispatched & commit mutations
  actions: {
    initialize({ commit }) {},
  },
};

export default entriesModule;
