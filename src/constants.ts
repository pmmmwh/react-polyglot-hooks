import Polyglot from 'node-polyglot';
import enhanceT from './enhanceT';

/**
 * The original t function from Polyglot.js.
 */
export type PolyglotT = typeof Polyglot.prototype.t;

/**
 * The t function for translation.
 */
export type tFunction = ReturnType<typeof enhanceT>;

// TODO: Remove after deprecation of number from interpolations in v0.4.0
export const NO_NUMBER_INTERPOLATIONS = [
  'Warning:',
  'Use of the interpolations prop as a shorthand for smart_count have been deprecated in favor of the count prop and will be removed in the next major version.',
  'Please update your app to use that instead.',
].join(' ');

export const NO_POLYGLOT_CONTEXT = [
  'Warning:',
  't is called without Polyglot context.',
  'Perhaps you need to wrap the component in <I18n>?',
].join(' ');
