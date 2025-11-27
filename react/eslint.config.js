import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import"; // ★ import 정렬용
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],

    plugins: {
      import: importPlugin, // ★ 플러그인 등록
      react,
    },

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      react.configs.flat.recommended,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx"],
        },
      },
    },

    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react/react-in-jsx-scope": "off",

      "import/order": [
        "error",
        {
          groups: [
            "builtin", // node 내장 모듈
            "external", // npm 패키지 (react 등)
            "internal", // @/src/* alias
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },

          // internal 하위 그룹에서 hooks → components 순으로 정렬
          pathGroups: [
            {
              pattern: "@/**/hooks/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/**/components/**",
              group: "internal",
              position: "after",
            },
          ],

          // builtin/external은 pathGroups로 영향받지 않도록 제외
          pathGroupsExcludedImportTypes: ["builtin", "external"],
        },
      ],
    },
  },
]);
