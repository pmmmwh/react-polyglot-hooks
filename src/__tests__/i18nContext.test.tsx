import * as React from 'react';
import { render } from '@testing-library/react';
import { spy } from 'sinon';
import { ValueTester } from '../../test';
import { NO_POLYGLOT_CONTEXT } from '../constants';
import I18nContext from '../i18nContext';

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
    const readValue = spy();
    const tree = (
      <I18nContext.Provider
        value={{
          locale: undefined,
          t: () => (undefined as React.ReactNode) as React.ReactElement,
        }}
      >
        <I18nContext.Consumer>
          {(values) => <ValueTester callback={readValue} value={values} />}
        </I18nContext.Consumer>
      </I18nContext.Provider>
    );
    render(tree);
    const calledValue = readValue.getCall(0).args[0];
    expect(typeof calledValue).toBe('object');

    const valueKeys = Object.keys(calledValue);
    expect(valueKeys).toHaveLength(2);
    expect(valueKeys).toStrictEqual(['locale', 't']);
  });

  it('should provide undefined locale without context', () => {
    const readValue = spy();
    const tree = (
      <I18nContext.Consumer>
        {({ locale }) => <ValueTester callback={readValue} value={locale} />}
      </I18nContext.Consumer>
    );
    render(tree);
    const calledValue = readValue.getCall(0).args[0];
    expect(calledValue).toBe(undefined);
  });

  it('should provide a fallback t function without context', () => {
    const readValue = spy();
    const tree = (
      <I18nContext.Consumer>
        {({ t }) => <ValueTester callback={readValue} value={t} />}
      </I18nContext.Consumer>
    );
    render(tree);
    const calledValue = readValue.getCall(0).args[0];
    expect(typeof calledValue).toBe('function');
    expect(calledValue.toString()).toContain('function warnWithoutContext');
    expect(calledValue('phrase')).toBe('phrase');
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
      const readValue = spy();
      const tree = (
        <I18nContext.Consumer>
          {({ t }) => <ValueTester callback={readValue} value={t} />}
        </I18nContext.Consumer>
      );
      render(tree);
      readValue.getCall(0).args[0]('phrase');
      expect(consoleOutput).toHaveLength(0);
    });
  });
});
