const plugin = require("tailwindcss/plugin");
module.exports = {
  calc: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".max-w-1249px": {
          maxWidth: "1249px",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
