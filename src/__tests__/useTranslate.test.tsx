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

  it('should return a function', () => {
    const { result } = renderHook(() => useTranslate());
    expect(typeof result.current).toBe('function');
  });

  describe('when context is not provided', () => {
    it('should return key on call and emit a warning', () => {
      const { result } = renderHook(() => useTranslate());
      const callResult = result.current('phrase');
      expect(callResult).toBe('phrase');
      expect(consoleOutput).toHaveLength(1);
      expect(consoleOutput[0]).toBe(
        'Warning: t is called without Polyglot context. Perhaps you need to wrap the component in <I18n>?'
      );
    });
  });

  describe('when context is provided', () => {
    describe('when the called phrase is not found', () => {
      it('should return the key and emit a warning', () => {
        const wrapper: React.FC = ({ children }) => (
          <I18n locale="en" phrases={{ phrase: 'Message' }}>
            {children}
          </I18n>
        );
        const { result } = renderHook(() => useTranslate(), { wrapper });
        const callResult = result.current('unavailable');
        expect(callResult).toBe('unavailable');
        expect(consoleOutput).toHaveLength(1);
        expect(consoleOutput[0]).toBe(
          'Warning: Missing translation for key: "unavailable"'
        );
      });

      it('should not interpolate without a fallback', () => {
        const wrapper: React.FC = ({ children }) => (
          <I18n locale="en" phrases={{ phrase: 'Message' }}>
            {children}
          </I18n>
        );
        const { result } = renderHook(() => useTranslate(), { wrapper });
        const callResult = result.current('unavailable', {
          message: 'Failed!',
        });
        expect(callResult).not.toContain('Failed!');
        expect(callResult).toBe('unavailable');
      });

      it('should interpolate to the fallback', () => {
        const wrapper: React.FC = ({ children }) => (
          <I18n locale="en" phrases={{ phrase: 'Message' }}>
            {children}
          </I18n>
        );
        const { result } = renderHook(() => useTranslate(), { wrapper });
        const callResult = result.current('unavailable', {
          _: 'Fallback: %{message}',
          message: 'Success!',
        });
        expect(callResult).not.toContain('unavailable');
        expect(callResult).toBe('Fallback: Success!');
      });
    });

    describe('when the called phrase is found', () => {
      it('should return the phrase without warning', () => {
        const wrapper: React.FC = ({ children }) => (
          <I18n locale="en" phrases={{ phrase: 'Message' }}>
            {children}
          </I18n>
        );
        const { result } = renderHook(() => useTranslate(), { wrapper });
        const callResult = result.current('phrase');
        expect(callResult).toBe('Message');
        expect(consoleOutput).toHaveLength(0);
      });

      it('should interpolate to the phrase', () => {
        const wrapper: React.FC = ({ children }) => (
          <I18n locale="en" phrases={{ phrase: 'Interpolated: %{message}' }}>
            {children}
          </I18n>
        );
        const { result } = renderHook(() => useTranslate(), { wrapper });
        const callResult = result.current('phrase', {
          message: 'Success!',
        });
        expect(callResult).toBe('Interpolated: Success!');
      });
    });
  });
});
