# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.4.0](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.3.1...v0.4.0) (2020-04-18)

### ⚠ BREAKING CHANGES

- remove number interpolations for T component
- bump minimum version of node to 10

### Features

- bump minimum version of node to 10 ([09d19a5](https://github.com/pmmmwh/react-polyglot-hooks/commit/09d19a500f81821c75541ca6312cb01c7776e078))
- remove number interpolations for T component ([be1a8c2](https://github.com/pmmmwh/react-polyglot-hooks/commit/be1a8c2418e3742ba433dfd2ba230bd35ba01acd))

### [0.3.1](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.3.0...v0.3.1) (2019-10-10)

### Features

- accept the pluralRules prop with I18n ([0a17568](https://github.com/pmmmwh/react-polyglot-hooks/commit/0a17568))
- add types to support custom plural rules ([1e9a17a](https://github.com/pmmmwh/react-polyglot-hooks/commit/1e9a17a))
- make pluralRules optional ([bd71c66](https://github.com/pmmmwh/react-polyglot-hooks/commit/bd71c66))

## [0.3.0](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.3.0-0...v0.3.0) (2019-09-05)

## [0.3.0-0](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.2.0...v0.3.0-0) (2019-09-02)

### Bug Fixes

- **t:** add type casting for fallback function return ([8e8e975](https://github.com/pmmmwh/react-polyglot-hooks/commit/8e8e975))
- **t:** return ReactElement instead of ReactNode ([1eb60ca](https://github.com/pmmmwh/react-polyglot-hooks/commit/1eb60ca))
- rename t type to PolyglotT ([786ed00](https://github.com/pmmmwh/react-polyglot-hooks/commit/786ed00))

### Features

- **i18n:** remove children.only but only render on polyglot mounted ([6e3eea8](https://github.com/pmmmwh/react-polyglot-hooks/commit/6e3eea8))
- **t:** add a count prop as a shorthand to use smart_count ([0524125](https://github.com/pmmmwh/react-polyglot-hooks/commit/0524125))
- **t:** add function overload to aid code auto completion ([a520de4](https://github.com/pmmmwh/react-polyglot-hooks/commit/a520de4))
- **t:** implement polyglot enhancer to allow component interpolation ([7936f72](https://github.com/pmmmwh/react-polyglot-hooks/commit/7936f72))
- **t:** update function types to enhanced t ([163a033](https://github.com/pmmmwh/react-polyglot-hooks/commit/163a033))
- **t:** utilize new enhancer and type in i18n ([f5abaaf](https://github.com/pmmmwh/react-polyglot-hooks/commit/f5abaaf))
- export PolyglotT type ([e582380](https://github.com/pmmmwh/react-polyglot-hooks/commit/e582380))

## [0.2.0](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.1.3...v0.2.0) (2019-08-28)

### Bug Fixes

- **i18n:** allow consumption of t options ([0e9371b](https://github.com/pmmmwh/react-polyglot-hooks/commit/0e9371b))
- **t:** BREAKING - rename options to interpolations ([88d58df](https://github.com/pmmmwh/react-polyglot-hooks/commit/88d58df))

### Features

- **t:** add a fallback prop for easier consumption ([f919872](https://github.com/pmmmwh/react-polyglot-hooks/commit/f919872))

### [0.1.3](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.1.2...v0.1.3) (2019-08-27)

### Bug Fixes

- **publish:** fix missing dist folder in v0.1.2 ([7783d6b](https://github.com/pmmmwh/react-polyglot-hooks/commit/7783d6b))

### [0.1.2](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.1.1...v0.1.2) (2019-08-27)

### Features

- **polyglot:** add T component for easy phrase consumption ([6d6d32c](https://github.com/pmmmwh/react-polyglot-hooks/commit/6d6d32c))

### [0.1.1](https://github.com/pmmmwh/react-polyglot-hooks/compare/v0.1.0...v0.1.1) (2019-08-26)

### Bug Fixes

- **deps-dev:** fix lock file mismatch ([80da34d](https://github.com/pmmmwh/react-polyglot-hooks/commit/80da34d))
- **polyglot:** make key in NoOp required ([37d68d3](https://github.com/pmmmwh/react-polyglot-hooks/commit/37d68d3))
- **publish:** properly distribute with the dist folder ([0b58f6f](https://github.com/pmmmwh/react-polyglot-hooks/commit/0b58f6f))

## 0.1.0 (2019-08-26)

### Features

- **polyglot:** add root export for publish ([53b2003](https://github.com/pmmmwh/react-polyglot-hooks/commit/53b2003))
- **polyglot:** augment polyglot type definitions ([4c5354d](https://github.com/pmmmwh/react-polyglot-hooks/commit/4c5354d))
- **polyglot:** implement i18n context ([f0f7d5c](https://github.com/pmmmwh/react-polyglot-hooks/commit/f0f7d5c))
- **polyglot:** implement i18n provider ([8905a53](https://github.com/pmmmwh/react-polyglot-hooks/commit/8905a53))
- **polyglot:** implement useLocale and useTranslate hooks ([aa8cd11](https://github.com/pmmmwh/react-polyglot-hooks/commit/aa8cd11))
- **testing:** add test runner script for local and ci ([1f6c1b8](https://github.com/pmmmwh/react-polyglot-hooks/commit/1f6c1b8))
