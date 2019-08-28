import * as React from 'react';
import Polyglot, { InterpolationOptions, PolyglotOptions } from 'node-polyglot';
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
    // Create a new instance on every change
    // This make sure we always consume the latest phrases and Polyglot context
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
    // We use a named function here to aid debugging
    function t(
      key: string,
      interpolations?: number | InterpolationOptions
    ): string {
      return polyglot.t(key, interpolations);
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
