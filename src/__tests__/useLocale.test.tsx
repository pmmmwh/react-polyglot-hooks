import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

import { I18n, useLocale } from '..';

describe('Use Locale', () => {
  it('should return undefined without context', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current).toBe(undefined);
  });

  it('should return the locale string with context', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <I18n locale="en" phrases={{}}>
        {children}
      </I18n>
    );
    const { result } = renderHook(() => useLocale(), { wrapper });
    expect(typeof result.current).toBe('string');
    expect(result.current).toBe('en');
  });
});
