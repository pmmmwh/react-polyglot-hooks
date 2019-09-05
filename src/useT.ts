import { useContext } from 'react';
import { tFunction } from './constants';
import I18nContext from './i18nContext';

/**
 * A hook to consume the t function.
 *
 * @returns The t function.
 */
const useT = (): tFunction => {
  const { t } = useContext(I18nContext);
  return t;
};

export default useT;
