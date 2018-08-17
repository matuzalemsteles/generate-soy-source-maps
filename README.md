# Soy SourceMaps &middot; [![CircleCI](https://circleci.com/gh/matuzalemsteles/generate-soy-source-maps.svg?style=svg)](https://circleci.com/gh/matuzalemsteles/generate-soy-source-maps) [![npm version](https://img.shields.io/npm/v/generate-soy-source-maps.svg?style=flat-square)](https://www.npmjs.com/package/generate-soy-source-maps) [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/matuzalemsteles/generate-soy-source-maps/blob/master/LICENSE.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/matuzalemsteles/generate-soy-source-maps)

Generates a source map for Closure template (Soy templates) based on the implementation [described here](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US#). The parsed code is the compiled to incremental Dom that is [made here](https://github.com/metal/metal-tools-soy).

Considering a map of origin for Soy, you guarantee some benefits:

* **Tests coverage** - With `soy.js` files being mapped by the tests you would never be able to cover all use cases, some are just implementations to cover older versions of soy, with source maps you will only cover the parts of interest without affecting the end result.
* **Debugger** - With the source map of **soy** files you will be able to debug in a simple way the same way you write in the syntax of Soy. You do not need to know the generated `soy.js` file.

## Table of Contents

- [Install](#install)
- [CLI](#cli)
  - [Usage](#usage)
  - [All CLI Options](#all-cli-options)
- [Integration](#integration)
  - [Using with webpack and metalsoy](#using-with-webpack-and-metalsoy)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Install

Via NPM:
```
$ npm install --global generate-soy-source-maps
```

or via Yarn:
```
$ yarn add --global generate-soy-source-maps
```

## CLI

### Usage

```
$ soy-sourcemaps
```

#### All CLI Options

```
  Usage
    $ soy-sourcemaps [options]

  Options
    --input      The path of the Soy file
    --output     The path to the final file
```

## Integration

### Using with webpack and metalsoy

You may want to integrate the **Soy** source map generator with your Webpack into your current stack. To do this, the webpack should take the source map generated from outside its scope, consider installing the `source-map-loader` loader that does exactly that.

```bash
npm install -D source-map-loader
```

In your webpack configuration file, consider adding this new rule:

```javascript
module.exports = {
  module: {
    rules: [
      //...
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      }
      //...
    ]
  }
  //...
};
```

For a better integration with `metalsoy`, if you have some task to run the build, consider running the source maps CLI after `metalsoy`:

```json
{
  "scripts": {
    "build": "metalsoy && soy-sourcemaps --input './src' && webpack"
  }
}
```

## Roadmap

Here's what's coming up for Soy Sourcemaps:

- ~~Typescript support~~
- ~~CLI: Generate sourcemaps for multiple files~~
- Integration with metal-tools-soy
- Parse HTML in soy files (with Sourcemaps for the generated)

## Contributing

Feel free to open up problems or send pull requests. We will always be looking at these problems and we will be responding whenever possible.

> Before opening a issue make sure it exists.

## License

[MIT License](LICENSE)