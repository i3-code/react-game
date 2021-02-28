module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'react/prop-types': 'off',
  },
};
