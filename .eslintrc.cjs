module.exports = {
  parser: '@typescript-eslint/parser', // Add the TypeScript parser
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'mantine',
    'plugin:@next/next/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended', // Add TypeScript ESLint recommended rules
  ],
  plugins: ['@typescript-eslint', 'testing-library', 'jest'], // Add TypeScript ESLint plugin
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    // Add any other custom rules here
    ignore: ['*.js', '*.mjs', '*.cjs'],
  },
};
