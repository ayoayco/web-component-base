module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["./site/**/*js"],
      rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
