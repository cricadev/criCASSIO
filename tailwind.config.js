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
      numArithDark: "#585653",
      numArithDarkContent: "#D38B1E",
      number: "#FFCB40",
      numberDark: "#3F3E3B",
      numberContent: "#CB7123",
      result: "#865915",
      resultDark: "#FCC73E",
      gradStops: "#FFAD0D",
      gradInitDark: "#3E3D3A",
      gradEndDark: "#2B2925",
    },
    extend: {
      fontFamily: {
        Aldrich: ["Aldrich", "sans-serif"],
      },
      screens: {
        "3xl": "1921px",
      },
    },
  },
  plugins: [],
};
