import { useContext } from 'react';
import I18nContext, { I18nContextProps } from './i18nContext';

const useLocale = (): I18nContextProps['locale'] => {
  const { locale } = useContext(I18nContext);
  return locale;
};

export default useLocale;
