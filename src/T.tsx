import * as React from 'react';
import { InterpolationOptions } from 'node-polyglot';
import { NO_NUMBER_INTERPOLATIONS } from './constants';
import useT from './useT';

/**
 * Props accepted by the T component.
 */
export interface TProps {
  /** A count used for pluralization. */
  count?: number;
  /** A fallback phrase to render when the provided key does not resolve. */
  fallback?: string;
  /** A key-value map of components or strings to be interpolated. */
  interpolations?: number | InterpolationOptions;
  /** The key of the phrase to render. */
  phrase: string;
}

/**
 * A component to render a translated string.
 */
const T: React.FC<TProps> = ({ count, fallback, interpolations, phrase }) => {
  const t = useT();

  let cleanInterpolations;
  if (typeof interpolations !== 'number') {
    cleanInterpolations = interpolations;
  } else {
    // TODO: Deprecate number from interpolations in v0.3.0
    // Handles number interpolation
    cleanInterpolations = { smart_count: interpolations };
    if (process.env.NODE_ENV !== 'production') {
      console.warn(NO_NUMBER_INTERPOLATIONS);
    }
  }

  const tOptions = {
    // Check for truthy prop values before assigning
    // This is done to prevent altering the specific options
    ...(fallback && { _: fallback }),
    ...(count && { smart_count: count }),
    ...cleanInterpolations,
  };

  // HACK: A workaround for the current limitations of TSX with FC
  // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
  return (t(phrase, tOptions) as unknown) as React.ReactElement;
};

export default T;
