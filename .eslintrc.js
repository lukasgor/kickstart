module.exports = {
  root: true,
  ignorePatterns: ['node_modules/**/**', 'build/**/**', '.next/**/**'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
  },
};
