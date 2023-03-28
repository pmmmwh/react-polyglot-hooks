import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { ValueTester } from '../../test';
import { NO_POLYGLOT_CONTEXT } from '../constants';
import type { I18nContextProps } from '../i18nContext';
import I18nContext from '../i18nContext';
import type { tFunction } from '../types';

describe('I18n Context', () => {
  const originalConsoleError = console.error;

  let consoleOutput: string[] = [];
  beforeEach(() => {
    console.error = (...args: string[]): void => {
      args.forEach((arg) => consoleOutput.push(arg));
    };
  });

  afterEach(() => {
    consoleOutput = [];
    console.error = originalConsoleError;
  });

  it('should only pass locale and t to children via context', () => {
    const readValue = jest.fn((v: I18nContextProps) => v);
    const tree = (
      <I18nContext.Provider
        value={{
          locale: undefined,
          t: () => undefined as unknown as ReactElement,
        }}
      >
        <I18nContext.Consumer>
          {(values) => <ValueTester callback={readValue} value={values} />}
        </I18nContext.Consumer>
      </I18nContext.Provider>
    );
    render(tree);
    const calledValue = readValue.mock.lastCall?.[0];
    expect(typeof calledValue).toBe('object');

    const valueKeys = Object.keys(calledValue!);
    expect(valueKeys).toHaveLength(2);
    expect(valueKeys).toStrictEqual(['locale', 't']);
  });

  it('should provide undefined locale without context', () => {
    const readValue = jest.fn((v?: string) => v);
    const tree = (
      <I18nContext.Consumer>
        {({ locale }) => <ValueTester callback={readValue} value={locale} />}
      </I18nContext.Consumer>
    );
    render(tree);
    const calledValue = readValue.mock.lastCall?.[0];
    expect(calledValue).toBe(undefined);
  });

  it('should provide a fallback t function without context', () => {
    const readValue = jest.fn((v: tFunction) => v);
    const tree = (
      <I18nContext.Consumer>
        {({ t }) => <ValueTester callback={readValue} value={t} />}
      </I18nContext.Consumer>
    );
    render(tree);
    const calledValue = readValue.mock.lastCall?.[0];
    expect(typeof calledValue).toBe('function');
    expect(calledValue!.toString()).toContain('function warnWithoutContext');
    expect(calledValue!('phrase')).toBe('phrase');
    expect(consoleOutput).toHaveLength(1);
    expect(consoleOutput[0]).toBe(NO_POLYGLOT_CONTEXT);
  });

  describe('In Production', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    beforeAll(() => {
      process.env.NODE_ENV = 'production';
    });

    afterAll(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should silence fallback t function warnings', () => {
      const readValue = jest.fn((v: tFunction) => v);
      const tree = (
        <I18nContext.Consumer>
          {({ t }) => <ValueTester callback={readValue} value={t} />}
        </I18nContext.Consumer>
      );
      render(tree);
      readValue.mock.lastCall![0]('phrase');
      expect(consoleOutput).toHaveLength(0);
    });
  });
});
