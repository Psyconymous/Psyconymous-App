module.exports = {
  // purge: [],
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        indigo: {
          700: "#05396b",
          600: "#1e4d7a",
          500: "#376189",
          400: "#507497",
          300: "#6988a6",
          200: "#829cb5",
          100: "#9bb0c4",
          50: "#b4c4d3",
        },
        emerald: {
          700: "#3c927f",
          600: "#509d8c",
          500: "#63a899",
          400: "#77b3a5",
          300: "#8abeb2",
          200: "#9ec9bf",
          100: "#b1d3cc",
          50: "#c5ded9",
        },
        "med-aqua": {
          700: "#5cdb94",
          600: "#6cdf9f",
          500: "#7de2a9",
          400: "#8de6b4",
          300: "#9de9bf",
          200: "#aeedca",
          100: "#bef1d4",
          50: "#cef4df",
        },
        "light-aqua": {
          700: "#8de4af",
          600: "#98e7b7",
          500: "#a4e9bf",
          400: "#afecc7",
          300: "#bbefcf",
          200: "#c6f2d7",
          100: "#d1f4df",
          50: "#ddf7e7",
        },
        beige: "#edf5e0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
