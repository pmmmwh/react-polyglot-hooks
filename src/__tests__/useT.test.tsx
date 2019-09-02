import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { I18n, useT } from '..';

describe('Use T', () => {
  it('should return the fallback function without context', () => {
    const { result } = renderHook(() => useT());
    expect(typeof result.current).toBe('function');
    expect(result.current.toString()).toContain('function warnWithoutContext');
  });

  it('should return the t function with context', () => {
    const wrapper: React.FC = ({ children }) => (
      <I18n locale="en" phrases={{}}>
        {children}
      </I18n>
    );
    const { result } = renderHook(() => useT(), { wrapper });
    expect(typeof result.current).toBe('function');
    expect(result.current.toString()).toContain('function t');
  });
});
