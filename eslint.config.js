import js from "@eslint/js";
import ts from "typescript-eslint";

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    {
        languageOptions: {
            globals: {
                console: "readonly",
                process: "readonly",
                __dirname: "readonly",
                module: "readonly",
            },
        },
        files: ["src/**/*.ts"],
        ignores: ["node_modules", "dist", "build"],
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "prefer-const": "error",
        },
    },
    ...ts.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json', // <-- add this
            },
        },
    }

];
