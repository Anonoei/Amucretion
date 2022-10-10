const rules = {
    // Copyright header
    "header/header": [
        2,
        "block",
        [
            "",
            " Copyright 2022 DAAV, LLC",
            " Licensed under the MIT license. See LICENSE for details.",
            "",
        ],
    ],
    // Prettier overrides
    "arrow-parens": "off",
    "function-paren-newline": "off",
    "max-len": [
        "warn",
        {
            code: 9999,
            comments: 90,
            ignoreUrls: true,
        },
    ],
    "comma-dangle": [
        "error",
        {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
            functions: "never",
        },
    ],
    quotes: [
        "error",
        "double",
        {avoidEscape: true, allowTemplateLiterals: false},
    ],

    "no-continue": "off",
    "lines-between-class-members": "off",
    "class-methods-use-this": "off",
    "no-useless-escape": "off",
};

const typescriptRules = {
    ...rules,
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/adjacent-overload-signatures": "off",
    "@typescript-eslint/brace-style": [
        "error",
        "1tbs",
        {allowSingleLine: false},
    ],
    "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
};

module.exports = {
    root: true,
    settings: {
        react: {
            version: "detect",
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
        env: {
            es6: true,
        },
    },
    plugins: ["header", "import", "more", "@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
    ],

    overrides: [
        {
            files: ["src/*/src/**/*.ts", "src/*/src/**/*.tsx"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: "module",
                env: {
                    es6: true,
                },
            },
            rules: typescriptRules,
        },
    ],
    rules: rules,
    reportUnusedDisableDirectives: true,
};
