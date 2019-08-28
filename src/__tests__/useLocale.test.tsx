import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { I18n, useLocale } from '..';

describe('Use Locale', () => {
  describe('when context is not provided', () => {
    it('should return undefined', () => {
      const { result } = renderHook(() => useLocale());
      expect(result.current).toBe(undefined);
    });
  });

  describe('when context is provided', () => {
    it('should return I18n locale string', () => {
      const wrapper: React.FC = ({ children }) => (
        <I18n locale="en" phrases={{}}>
          {children}
        </I18n>
      );
      const { result } = renderHook(() => useLocale(), { wrapper });
      expect(typeof result.current).toBe('string');
      expect(result.current).toBe('en');
    });
  });
});
