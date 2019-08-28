import * as React from 'react';
import { InterpolationOptions } from 'node-polyglot';
import useTranslate from './useTranslate';

export interface TProps {
  fallback?: string;
  options?: number | InterpolationOptions;
  phrase: string;
}

const T: React.FC<TProps> = ({ fallback, options, phrase }) => {
  const t = useTranslate();

  const tOptions = {
    // Check for a fallback prop before assigning it as it will alter the options
    ...(fallback ? { _: fallback } : undefined),
    // Check for existence of the interpolations prop
    ...(options &&
      // Handles smart_count from a number
      // This allows the fallback to be safely assigned
      (typeof options === 'number' ? { smart_count: options } : options)),
  };

  // HACK: A workaround for the current limitations of TSX with FC
  // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
  return (t(phrase, tOptions) as unknown) as React.ReactElement;
};

export default T;
