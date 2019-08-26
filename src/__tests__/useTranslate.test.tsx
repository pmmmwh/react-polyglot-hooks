import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { I18n, useTranslate } from '..';

describe('Use Translate', () => {
  const originalConsoleError = console.error;

  let consoleOutput: string[] = [];
  beforeEach(() => {
    console.error = (...args: string[]): void => {
      args.forEach(arg => consoleOutput.push(arg));
    };
  });

  afterEach(() => {
    consoleOutput = [];
    console.error = originalConsoleError;
  });

  it('should return key and warn without context', () => {
    const { result } = renderHook(() => useTranslate());
    expect(typeof result.current).toBe('function');

    const callResult = result.current('key');
    expect(callResult).toBe('key');
    expect(consoleOutput).toHaveLength(1);
    expect(consoleOutput[0]).toBe(
      'Warning: t is called without Polyglot context. Perhaps you need to wrap the component in <I18n>?'
    );
  });

  it('should return available message with context', () => {
    const wrapper: React.FC = ({ children }) => (
      <I18n locale="en" phrases={{ key: 'Message' }}>
        {children}
      </I18n>
    );
    const { result } = renderHook(() => useTranslate(), { wrapper });
    expect(typeof result.current).toBe('function');

    const callResult = result.current('key');
    expect(callResult).toBe('Message');
    expect(consoleOutput).toHaveLength(0);
  });

  it('should return key and warn for unavailable message with context', () => {
    const wrapper: React.FC = ({ children }) => (
      <I18n locale="en" phrases={{ key: 'Message' }}>
        {children}
      </I18n>
    );
    const { result } = renderHook(() => useTranslate(), { wrapper });
    expect(typeof result.current).toBe('function');

    const callResult = result.current('unavailable');
    expect(callResult).toBe('unavailable');
    expect(consoleOutput).toHaveLength(1);
    expect(consoleOutput[0]).toBe(
      'Warning: Missing translation for key: "unavailable"'
    );
  });
});
