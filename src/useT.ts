import { useContext } from 'react';
import I18nContext from './i18nContext';
import type { tFunction } from './types';

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
