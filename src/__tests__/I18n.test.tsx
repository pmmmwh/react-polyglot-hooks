import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { spy } from 'sinon';
import { ValueTester } from '../../test';
import I18n, { I18nProps } from '../I18n';
import I18nContext from '../i18nContext';

describe('I18n Provider', () => {
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

  describe('when no children is provided', () => {
    it('should throw an invariant error', () => {
      expect(() => render(<I18n locale="" phrases={{}} />)).toThrow();
      expect(consoleOutput).toHaveLength(3);
      expect(consoleOutput[0]).toContain('Invariant Violation');
    });
  });

  describe('when multiple children is provided', () => {
    it('should throw an invariant error', () => {
      expect(() =>
        render(
          <I18n locale="" phrases={{}}>
            <div />
            <div />
          </I18n>
        )
      ).toThrow();
      expect(consoleOutput).toHaveLength(3);
      expect(consoleOutput[0]).toContain('Invariant Violation');
    });
  });

  describe('when a single child is provided', () => {
    it('should render without crashing', () => {
      const { getByText } = render(
        <I18n locale="" phrases={{}}>
          <span>Children</span>
        </I18n>
      );
      expect(getByText('Children')).toBeInTheDocument();
      expect(consoleOutput).toHaveLength(0);
    });

    it('should only pass locale and t to children via context', () => {
      const readValue = spy();
      const tree = (
        <I18n locale="en" phrases={{}}>
          <I18nContext.Consumer>
            {values => <ValueTester callback={readValue} value={values} />}
          </I18nContext.Consumer>
        </I18n>
      );
      render(tree);
      const calledValue = readValue.getCall(0).args[0];
      expect(typeof calledValue).toBe('object');

      const valueKeys = Object.keys(calledValue);
      expect(valueKeys).toHaveLength(2);
      expect(valueKeys).toStrictEqual(['locale', 't']);
    });

    it('should provide a locale from Polyglot', () => {
      const tree = (
        <I18n locale="en" phrases={{}}>
          <I18nContext.Consumer>
            {({ locale }) => <span>Received: {locale}</span>}
          </I18nContext.Consumer>
        </I18n>
      );
      const { getByText } = render(tree);
      expect(getByText(/^Received:/).textContent).toBe('Received: en');
    });

    it('should provide a working t function from Polyglot', () => {
      const readValue = spy();
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Message' }}>
          <I18nContext.Consumer>
            {({ t }) => <ValueTester callback={readValue} value={t} />}
          </I18nContext.Consumer>
        </I18n>
      );
      render(tree);
      const calledValue = readValue.getCall(0).args[0];
      expect(typeof calledValue).toBe('function');
      expect(calledValue('phrase')).toBe('Message');
    });

    it('should update after a change in locale', () => {
      const Tree: React.FC<Pick<I18nProps, 'locale'>> = ({ locale }) => (
        <I18n locale={locale} phrases={{}}>
          <I18nContext.Consumer>
            {({ locale }) => <span>Received: {locale}</span>}
          </I18nContext.Consumer>
        </I18n>
      );
      const { getByText, rerender } = render(<Tree locale="en" />);
      expect(getByText(/^Received:/).textContent).toBe('Received: en');

      rerender(<Tree locale="zh" />);
      expect(getByText(/^Received:/).textContent).toBe('Received: zh');
    });

    it('should update after a change in phrases', () => {
      const readValue = spy();
      const Tree: React.FC<Pick<I18nProps, 'phrases'>> = ({ phrases }) => (
        <I18n locale="en" phrases={phrases}>
          <I18nContext.Consumer>
            {({ t }) => <ValueTester callback={readValue} value={t} />}
          </I18nContext.Consumer>
        </I18n>
      );
      const { rerender } = render(<Tree phrases={{ test: 'Test' }} />);
      const firstValue = readValue.getCall(0).args[0];
      expect(typeof firstValue).toBe('function');
      expect(firstValue('test')).toBe('Test');

      rerender(<Tree phrases={{ test: 'Expected' }} />);
      const secondValue = readValue.getCall(1).args[0];
      expect(typeof secondValue).toBe('function');
      expect(secondValue('test')).toBe('Expected');
    });
  });
});
