import { createContext } from 'react';
import { NO_POLYGLOT_CONTEXT, t } from './constants';

function warnWithoutContext(...[key]: Parameters<t>): string {
  if (process.env.NODE_ENV !== 'production') {
    console.error(NO_POLYGLOT_CONTEXT);
  }
  return key;
}

export interface I18nContextProps {
  locale: string | undefined;
  t: t;
}

const I18nContext = createContext<I18nContextProps>({
  locale: undefined,
  t: warnWithoutContext,
});

export default I18nContext;
