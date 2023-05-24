/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/index.tsx"],
  theme: {
    extend: {
      colors: {
        dark_green: {
          100: "#38473c",
          200: "#dbdfff",
          300: "#303631",
          400: "#2c302c",
          500: "#1f2320",
        },
        royal_blue: {
          100: "#cbcee7",
          200: "#b9bddf",
          300: "#a8add7",
          400: "#858cc7",
          500: "#737cbf",
          600: "#626bb7",
          700: "#505baf",
        },
        primary: "#505baf",
        accent: "#dcfce7",
      },
    },
  },
  plugins: [],
};
