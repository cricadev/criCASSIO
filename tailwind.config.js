/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  theme: {
    colors: {
      numArith: "#EDA61E",
      number: "#FFCB40",
      numberContent: "#CB7123",
      result: "#865915",
    },
    extend: {
      fontFamily: {
        Aldrich: ["Aldrich", "sans-serif"],
      },
    },
  },
  plugins: [],
};
