import * as React from 'react';
import { InterpolationOptions } from 'node-polyglot';
import useTranslate from './useTranslate';

export interface TProps {
  count?: number;
  fallback?: string;
  interpolations?: number | InterpolationOptions;
  phrase: string;
}

const T: React.FC<TProps> = ({ count, fallback, interpolations, phrase }) => {
  const t = useTranslate();

  let cleanInterpolations;
  if (typeof interpolations !== 'number') {
    cleanInterpolations = interpolations;
  } else {
    // TODO: Deprecate number from interpolations in v0.3.0
    // Handles number interpolation
    cleanInterpolations = { smart_count: interpolations };
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        [
          'Use of the interpolations prop as a shorthand for smart_count have been deprecated in favor of the count prop and will be removed in the next major version.',
          'Please update your app to use that instead.',
        ].join(' ')
      );
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
