import Root from "./components";
const skylarkTheme = {
  name: "skylark-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      userData: null,
      loggedIn: false,
    },
  },
  actions: {
    theme: {
      autoPrefetch: "in-view",
      setLoggedIn:
        ({ state }) =>
        (value) => {
          state.theme.loggedIn = value;
        },
      beforeSSR: async ({ state, actions }) => {
        await Promise.all([actions.source.fetch("/events/")]);
      },
      beforeCSR: async ({ state }) => {
        console.log("After CSR");
        if (document.cookie) {
          state.theme.userData = await document.cookie;
        }
      },
    },
  },
};
export default skylarkTheme;
