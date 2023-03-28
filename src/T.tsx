import type { InterpolationOptions } from 'node-polyglot';

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
  interpolations?: InterpolationOptions;
  /** The key of the phrase to render. */
  phrase: string;
}

/**
 * A component to render a translated string.
 */
const T = ({ count, fallback, interpolations, phrase }: TProps) => {
  const t = useT();

  const tOptions = {
    // Check for truthy prop values before assigning
    // This is done to prevent altering the specific options
    ...(fallback && { _: fallback }),
    ...(count && { smart_count: count }),
    ...interpolations,
  };

  return t(phrase, tOptions);
};

export default T;
