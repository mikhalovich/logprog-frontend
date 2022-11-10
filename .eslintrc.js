export default {
    plugins: [' @typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
        'plugin:typescript-enum/recommended',
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        quotes: ['warn', 'single'],
        'vue/no-multiple-template-root': 'off',
    },
};
