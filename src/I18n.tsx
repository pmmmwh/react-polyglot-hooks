import * as React from 'react';
import Polyglot, { PolyglotOptions } from 'node-polyglot';
import enhanceT from './enhanceT';
import I18nContext from './i18nContext';

/**
 * Props accepted by the I18n component.
 */
export interface I18nProps extends PolyglotOptions {
  /** The current locale. */
  locale: string;
  /** The current key-value map of phrases. */
  phrases: object;
}

/**
 * A component to allow consumption of i18n props from any nested children.
 */
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

  const polyglotContext = React.useMemo(
    () => ({
      locale: polyglot.locale(),
      t: enhanceT(polyglot.t.bind(polyglot)),
    }),
    [polyglot]
  );

  return (
    <I18nContext.Provider value={polyglotContext}>
      {polyglotContext.locale && children}
    </I18nContext.Provider>
  );
};

export default I18n;
