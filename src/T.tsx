import * as React from 'react';
import useT from './useT';
import type { InterpolationOptions } from 'node-polyglot';

/**
 * Props accepted by the T component.
 */
export interface TProps {
  /** A count used for pluralization. */
  count?: number;
  /** A fallback phrase to render when the provided key does not resolve. */
  fallback?: string;
  /** A key-value map of components or strings to be interpolated. */
  interpolations?: InterpolationOptions;
  /** The key of the phrase to render. */
  phrase: string;
}

/**
 * A component to render a translated string.
 */
const T: React.FC<TProps> = ({ count, fallback, interpolations, phrase }) => {
  const t = useT();

  const tOptions = {
    // Check for truthy prop values before assigning
    // This is done to prevent altering the specific options
    ...(fallback && { _: fallback }),
    ...(count && { smart_count: count }),
    ...interpolations,
  };

  // HACK: A workaround for the current limitations of TSX with FC
  // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
  return t(phrase, tOptions) as unknown as React.ReactElement;
};

export default T;
