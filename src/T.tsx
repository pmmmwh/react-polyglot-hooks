import * as React from 'react';
import { InterpolationOptions } from 'node-polyglot';
import useTranslate from './useTranslate';

export interface TProps {
  phrase: string;
  options?: number | InterpolationOptions;
}

const T: React.FC<TProps> = ({ phrase, options }) => {
  const t = useTranslate();
  // HACK: A workaround for the current limitations of TSX with FC
  // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
  return (t(phrase, options) as unknown) as React.ReactElement;
};

export default T;
