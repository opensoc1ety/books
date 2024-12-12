/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./search.html", "./scripts/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
      themes: ["lemonade"],
  },
}

