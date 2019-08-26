import * as React from 'react';
import Polyglot, { PolyglotOptions } from 'node-polyglot';
import I18nContext from './i18nContext';

export interface I18nProps extends PolyglotOptions {
  locale: string;
  phrases: object;
}

const I18n: React.FC<I18nProps> = ({
  children,
  locale,
  phrases,
  allowMissing,
  onMissingKey,
  interpolation,
}) => {
  const polyglot = React.useMemo<Polyglot>(
    () =>
      new Polyglot({
        locale,
        phrases,
        allowMissing,
        onMissingKey,
        interpolation,
      }),
    [locale, phrases, allowMissing, onMissingKey, interpolation]
  );
  const t = React.useCallback(
    function t(key: string): string {
      return polyglot.t(key);
    },
    [polyglot]
  );
  return (
    <I18nContext.Provider value={{ locale: polyglot.locale(), t }}>
      {React.Children.only(children)}
    </I18nContext.Provider>
  );
};

export default I18n;
