/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        lightLBg: "#DDF2FD",
        darkDBg: "#181818",
        lightDBg: "#164863",
        darkLBg: "#427D9D",
        lightText: "#164863",
        darkText: "#ffffff",
        lightLink: "#007bff",
        darkLink: "#ff5722",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
