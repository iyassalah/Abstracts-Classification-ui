/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "airbnb",
    // "airbnb/hooks",
    // "airbnb-typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    'react/react-in-jsx-scope': 0,
  },
};
