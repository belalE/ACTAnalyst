const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  // plugins: [require("@tailwindcss/forms")],
};
