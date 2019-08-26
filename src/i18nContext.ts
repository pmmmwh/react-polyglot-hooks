import { createContext } from 'react';
import Polyglot from 'node-polyglot';

const NoOp = (key?: string): string | undefined => {
  console.error(
    'Warning: t is called without Polyglot context. Perhaps you need to wrap the component in <I18n>?'
  );
  return key;
};

export interface I18nContextProps {
  locale?: string;
  t: typeof Polyglot.prototype.t | typeof NoOp;
}

const I18nContext = createContext<I18nContextProps>({
  t: NoOp,
});

export default I18nContext;
