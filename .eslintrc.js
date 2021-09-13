module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'gtm-arg.js', 'gtm.js', 'analytics.js'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'linebreak-style': 0,
    'quote-props': 0,
    'comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'off',
  },
};
