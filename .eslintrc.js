module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/rule-name": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": 1,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "indent": ["error", 2]
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ]
};
