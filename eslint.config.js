import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, globalIgnores } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import globals from 'globals';
import * as reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import noSecrets from 'eslint-plugin-no-secrets';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default tseslint.config(
    ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:diff/diff',
    ),
    reactHooks.configs['recommended-latest'],
    perfectionist.configs['recommended-natural'],
    tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            js,
            'no-secrets': noSecrets,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'no-secrets/no-secrets': 'error',
            'perfectionist/sort-objects': 'off',
            'perfectionist/sort-object-types': 'off',
        },

        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    },
    globalIgnores([
        'node_modules/**/*',
        '.github/**/*',
        '.husky/**/*',
        '.next/**/*',
        'public/**/*',
        'build/**/*',
        '*.json',
        '*.md',
        '*.mjs',
        '*.config.js',
        '*.css',
        '*.xml',
        '*.html',
        '*.ico',
        '.gitignore',
        '.prettierignore',
    ]),
);
