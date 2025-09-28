import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import eslintPluginImportX from "eslint-plugin-import-x";
import oxlint from "eslint-plugin-oxlint";
import pluginVue from "eslint-plugin-vue";
import baseConfig from "./codestyle/config-eslint/base.js";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  ...pluginVue.configs["flat/strongly-recommended"],
  ...vueTsEslintConfig(),

  {
    plugins: {
      "import-x": eslintPluginImportX,
    },

    rules: {
      ...baseConfig.rules,

      "no-unused-expressions": "off",
      "max-lines": "off",
      "sort-imports": "off",

      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-implicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",

      "import-x/no-self-import": "error",
      "import-x/no-cycle": "error",
      "import-x/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            "app",
            "pages",
            "widgets",
            "features",
            "entities",
            "shared",
          ].map((layer) => ({
            pattern: `**/?(*)${layer}{,/**}`,
            group: "internal",
            position: "after",
          })),
          pathGroupsExcludedImportTypes: ["builtin"],
          groups: [
            "external",
            "builtin",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
        },
      ],

      "vue/multi-word-component-names": "off",
      "vue/no-unused-emit-declarations": "error",
      "vue/no-undef-components": [
        "error",
        {
          ignorePatterns: ["router-(view|link)", "client-only"],
        },
      ],
    },
  },

  oxlint.configs["flat/recommended"],
  skipFormatting,
];
