module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
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
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-unused-vars": "warn",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "no-shadow": "off",
    "@next/next/no-img-element": "off",
    "eslint-disable-next-line": "off",
    camelcase: "off",
    "react/jsx-pascal-case": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
