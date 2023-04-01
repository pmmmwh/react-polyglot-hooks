import type { PolyglotOptions } from 'node-polyglot';
import Polyglot from 'node-polyglot';
import { useMemo } from 'react';

import enhanceT from './enhanceT';
import I18nContext from './i18nContext';

/**
 * Props accepted by the I18n component.
 */
export interface I18nProps extends PolyglotOptions {
  /** The children to consume i18n props. */
  children?: React.ReactNode;
  /** The current locale. */
  locale: string;
  /** The current key-value map of phrases. */
  phrases: object;
}

/**
 * A component to allow consumption of i18n props from any nested children.
 */
const I18n = ({
  children,
  locale,
  phrases,
  allowMissing,
  interpolation,
  onMissingKey,
  pluralRules,
}: I18nProps) => {
  const polyglot = useMemo<Polyglot>(
    // Create a new instance on every change
    // This make sure we always consume the latest phrases and Polyglot context
    () =>
      new Polyglot({
        locale,
        phrases,
        allowMissing,
        interpolation,
        onMissingKey,
        pluralRules,
      }),
    [locale, phrases, allowMissing, interpolation, onMissingKey, pluralRules]
  );

  const polyglotContext = useMemo(
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
