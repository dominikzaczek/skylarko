const settings = {
  name: "skylarkevents",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "Test Frontity Blog",
      description: "WordPress installation for Frontity development",
    },
    salt: "skylark-creative-co-uk-with-the-best-event-page-in-the-world",
  },
  router: {
    link: "/events",
    autoFetch: true,
  },
  packages: [
    {
      name: "skylarktheme",
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "http://localhost:8888/skylark",
          postTypes: [
            {
              type: "events",
              endpoint: "events",
              archive: "/events",
            },
            {
              type: "panelists",
              endpoint: "panelists",
              archive: "/panelists",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
