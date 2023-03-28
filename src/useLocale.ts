import { useContext } from 'react';

import type { I18nContextProps } from './i18nContext';
import I18nContext from './i18nContext';

/**
 * A hook to consume the current locale.
 *
 * @returns The current active locale.
 */
const useLocale = (): I18nContextProps['locale'] => {
  const { locale } = useContext(I18nContext);
  return locale;
};

export default useLocale;
