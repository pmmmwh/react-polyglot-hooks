import { useContext } from 'react';
import I18nContext, { I18nContextProps } from './i18nContext';

const useTranslate = (): I18nContextProps['t'] => {
  const { t } = useContext(I18nContext);
  return t;
};

export default useTranslate;
