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
