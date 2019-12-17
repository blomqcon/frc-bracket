const path = require('path');

module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      "airbnb",
      "airbnb/hooks"
    ],
    parserOptions:  {
      ecmaVersion:  2018,
      sourceType:  'module',
      ecmaFeatures:  {
        jsx:  true,
      },
    },
    rules:  {
      // This is a big number, lots of complex react-redux types though
      // Maybe I should make better use of typedefs...
      "max-len": [1, { code: 130 }],

      // Allow jsx syntax in both jsx and tsx files. 
      "react/jsx-filename-extension": [2, { "extensions": [".jsx", ".tsx"] }],

      // Don't enforce propTypes usage since TypeScript makes similar compile time assurances.
      "react/prop-types": 0,

      // With TypeScript this seems unnecessary.
      "react/destructuring-assignment": 0,

      // What? No, this makes this ugly and difficult to read.
      "react/jsx-one-expression-per-line": 0,
    },
    settings:  {
      react:  {
        version:  'detect',
      },
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      },
    },
  };