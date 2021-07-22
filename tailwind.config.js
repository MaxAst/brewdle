module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "pastel-violet": "#E9DEFA",
        "pastel-yellow": "#FBFCDB",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
