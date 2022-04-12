const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
       Updock: "'Updock', cursive",
        Quicksand: "'Quicksand', sans-serif",
      },
    },
  },
  plugins: [],
};
