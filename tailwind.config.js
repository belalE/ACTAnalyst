const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const components = {
        // ...
        ".navbar-inverse a.nav-link": {
          color: "#fff",
        },
      };

      addComponents(components);
    }),
  ],
};
