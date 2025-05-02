/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        custom: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
