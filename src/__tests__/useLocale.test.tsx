import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { I18n, useLocale } from '..';

describe('Use Locale', () => {
  it('should be undefined without context', () => {
    const { result } = renderHook(() => useLocale());

    expect(result.current).toBe(undefined);
  });

  it('should be current locale with context', () => {
    const wrapper: React.FC = ({ children }) => (
      <I18n locale="en" phrases={{}}>
        {children}
      </I18n>
    );
    const { result } = renderHook(() => useLocale(), { wrapper });

    expect(result.current).toBe('en');
  });
});
