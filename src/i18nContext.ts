import * as React from 'react';
import { NO_POLYGLOT_CONTEXT } from './constants';
import type { tFunction } from './types';

function warnWithoutContext(...[key]: Parameters<tFunction>): ReturnType<tFunction> {
  if (process.env.NODE_ENV !== 'production') {
    console.error(NO_POLYGLOT_CONTEXT);
  }
  return key as React.ReactNode as React.ReactElement;
}

/**
 * The props provided by I18nContext.
 */
export interface I18nContextProps {
  locale: string | undefined;
  t: tFunction;
}

/**
 * The central store for i18n related components.
 */
const I18nContext = React.createContext<I18nContextProps>({
  locale: undefined,
  t: warnWithoutContext,
});

export default I18nContext;
