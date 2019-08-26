# React Polyglot Hooks

Hooks for using [Polyglot.js](https://airbnb.io/polyglot.js) with [React](https://reactjs.org/).

[![npm Package](https://img.shields.io/npm/v/react-polyglot-hooks/latest.svg)](https://www.npmjs.com/package/react-polyglot-hooks)
[![CircleCI](https://img.shields.io/circleci/project/github/pmmmwh/react-polyglot-hooks/master.svg)](https://circleci.com/gh/pmmmwh/react-polyglot-hooks/tree/master)
[![Coverage Status](https://img.shields.io/codecov/c/github/pmmmwh/react-polyglot-hooks/master.svg)](https://codecov.io/gh/pmmmwh/react-polyglot-hooks/branch/master)
![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=pmmmwh/react-polyglot-hooks)](https://dependabot.com)
[![Dependencies](https://david-dm.org/pmmmwh/react-polyglot-hooks/master/status.svg)](https://david-dm.org/pmmmwh/react-polyglot-hooks/master)
[![PeerDependencies](https://david-dm.org/pmmmwh/react-polyglot-hooks/master/peer-status.svg)](https://david-dm.org/pmmmwh/react-polyglot-hooks/master?type=peer)
[![DevDependencies](https://david-dm.org/pmmmwh/react-polyglot-hooks/master/dev-status.svg)](https://david-dm.org/pmmmwh/react-polyglot-hooks/master?type=dev)

## Installation

React Polyglot Hooks is available as an [npm package](https://www.npmjs.com/package/react-polyglot-hooks).

```sh
// with npm
npm install react-polyglot-hooks

// with yarn
yarn add react-polyglot-hooks
```

> React is required as a peer dependency.
> Please install version 16.8.0 or later (minimum requirement for hooks).

## Usage

React Polyglot Hooks offers 1 wrapper component: `<I18n>` and 2 hooks: `useLocale` and `useTranslate`.
The hooks have to be wrapped with the `<I18n>` component to work properly.

Here is a quick example to get you started:
First, wrap a parent component with `<I18n>` and provide `locale` and `phrases`.

`Parent.jsx`

```jsx
import React from 'react';
import { I18n } from 'react-polyglot-hooks';
import Child from './Child';

// ... or any ways to determine current locale
const locale = window.locale || 'en';

// You can put translations in separate files
const phrases = {
  en: { hello: 'Hello, World!' },
  fr: { hello: 'Bonjour, Monde!' },
};

export default function Parent() {
  return (
    <I18n locale={locale} phrases={phrases[locale]}>
      <Child />
    </I18n>
  );
}
```

Then, in a child component, call the hooks:

`Child.jsx`

```jsx
import React from 'react';
import { useLocale, useTranslate } from 'react-polyglot-hooks';

export default function Child() {
  const locale = useLocale(); // Current locale: "en"
  const t = useTranslate(); // Translate function, see below

  return (
    <React.Fragment>
      <span>{locale}</span>
      <span>{t('hello')}</span>
    </React.Fragment>
  );
}
```

That's it!

### Usage with TypeScript

Types are baked in as the project is written in [TypeScript](https://www.typescriptlang.org/).

## API

### `<I18n>`

Provides i18n context to the hooks. Accepts all options supported by [Polyglot.js](https://airbnb.io/polyglot.js).

#### Props

| Prop            | Type                                                                     | Required | Description                                                                       |
| --------------- | ------------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------- |
| `children`      | `Node`                                                                   | ✅       | Any node(s) accepted by React.                                                    |
| `locale`        | `string`                                                                 | ✅       | Current locale, used for pluralization.                                           |
| `phrases`       | `{ [key: string]: string }`                                              | ✅       | Key-value pair of translated phrases, can be nested.                              |
| `allowMissing`  | `boolean`                                                                | ❌       | Controls whether missing keys in a `t` call is allowed.                           |
| `onMissingKey`  | `(key: string, options: InterpolationOptions, locale: string) => string` | ❌       | A function called when `allowMissing` is `true` and a missing key is encountered. |
| `interpolation` | `{ prefix: string, suffix: string }`                                     | ❌       | Controls the prefix and suffix for an interpolation.                              |

### `useLocale`

Returns the current active locale (`string`).

### `useTranslate`

Returns a special function (`t`) which takes in parameters and returns a phrase.

#### `t(phrase, InterpolationOptions)`

| Param                  | Type                                    | Required | Description                                                                                                |
| ---------------------- | --------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `phrase`               | `string`                                | ✅       | Key of the needed phrase.                                                                                  |
| `InterpolationOptions` | `number` or `{ [key: string]: string }` | ❌       | A number to be interpolated with `smart_count`, or a key-value pair to interpolate values into the phrase. |

For more details, please visit the [documentation](https://airbnb.io/polyglot.js) of Polyglot.js.

## Changelog

The changelog is available [here](/CHANGELOG.md).

## License

This project is licensed under the terms of the
[MIT License](/LICENSE).

## Acknowledgements

This project is a wrapper to ease the use of [Polyglot.js](https://airbnb.io/polyglot.js) within [React](https://reactjs.org/), and is highly influenced by [`react-polyglot`](https://github.com/nayaabkhan/react-polyglot).
