module.exports = {
  extends: ['airbnb-base'],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  globals: {
    document: false,
    $: false,
    ga: false,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-plusplus': 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-tabs': 0,
    radix: 0,
    'prefer-const': 0,
    'no-param-reassign': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
    semi: ['error', 'always'],
    'prefer-arrow-callback': 0,
    'arrow-body-style': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-confusing-arrow': 0,
    'no-continue': 0,
    'comma-dangle': 'off',
    'eol-last': 0,
    'default-case': 0,
    'no-alert': 0,
    'consistent-return': 0,
    'no-new': 0,
    'func-names': 0,
    'prefer-template': 'warn',
    camelcase: 'warn',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'spaced-comment': 0,
    'no-multi-assign': 0,
    'no-prototype-builtins': 0,
    'nonblock-statement-body-position': 0,
    'arrow-parens': ['error', 'as-needed'],
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'no-return-assign': 0,
    'padded-blocks': 0,
    curly: ['error', 'all'],
    'no-extra-parens': [
      'error',
      'all',
      {
        nestedBinaryExpressions: false,
      },
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
      },
    ],
    /* IMPORTS */
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },
};
