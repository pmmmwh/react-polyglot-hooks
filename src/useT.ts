import { useContext } from 'react';
import { PolyglotT } from './constants';
import I18nContext from './i18nContext';

const useT = (): PolyglotT => {
  const { t } = useContext(I18nContext);
  return t;
};

export default useT;
