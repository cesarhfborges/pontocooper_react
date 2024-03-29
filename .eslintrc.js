module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 0,
        '@typescript-eslint/no-unused-vars': 'warn',
        'prettier/prettier': [
          'error',
          {
            'no-inline-styles': false,
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
  rules: {
    // 'max-len': ['error', {code: 100, ignoreComments: true, tabWidth: 0}],
  },
};
