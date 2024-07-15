const eslintPluginJs = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended");
const globals = require("globals");

module.exports = [
  eslintPluginJs.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __dirname: true,
        process: true,
        __unused_webpack_module: true,
        exports: true,
        __webpack_exports__: true,
        __webpack_require__: true,
        // 추가로 필요한 내부 변수들을 여기에 추가할 수 있습니다.
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // 필요한 경우 추가 규칙을 설정할 수 있습니다.
    },
  },
  pluginReactConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __dirname: true,
        process: true,
        __unused_webpack_module: true,
        exports: true,
        __webpack_exports__: true,
        __webpack_require__: true,
        // 추가로 필요한 내부 변수들을 여기에 추가할 수 있습니다.
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      'no-unused-vars': 'off', // 일시적으로 규칙을 해제합니다.
      // 다른 규칙들 설정
    },
  },
];