import { createContext } from 'react';
import { NO_POLYGLOT_CONTEXT, PolyglotT } from './constants';

function warnWithoutContext(...[key]: Parameters<PolyglotT>): string {
  if (process.env.NODE_ENV !== 'production') {
    console.error(NO_POLYGLOT_CONTEXT);
  }
  return key;
}

export interface I18nContextProps {
  locale: string | undefined;
  t: PolyglotT;
}

const I18nContext = createContext<I18nContextProps>({
  locale: undefined,
  t: warnWithoutContext,
});

export default I18nContext;
