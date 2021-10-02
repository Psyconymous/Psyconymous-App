module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    node: true,
  },
  extends: [
    /* "eslint:recommended", */
    "plugin:vue/vue3-essential",
    "**prettier**",
  ],
  rules: {},
};
