import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';

import { ValueTester } from '../../test';
import type { I18nProps } from '../I18n';
import I18n from '../I18n';
import I18nContext from '../i18nContext';
import type { tFunction } from '../types';

describe('I18n Provider', () => {
  it('should render without crashing', () => {
    render(<I18n locale="" phrases={{}} />);
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

  it('should provide default locale (en) from Polyglot', () => {
    const tree = (
      <I18n locale="" phrases={{}}>
        <I18nContext.Consumer>
          {({ locale }) => <span>Received: {locale}</span>}
        </I18nContext.Consumer>
      </I18n>
    );
    const { getByText } = render(tree);
    expect(getByText(/^Received:/).textContent).toBe('Received: en');
  });

  it('should provide a working t function from Polyglot', () => {
    const readValue = jest.fn((v: tFunction) => v);
    const tree = (
      <I18n locale="en" phrases={{ phrase: 'Message' }}>
        <I18nContext.Consumer>
          {({ t }) => <ValueTester callback={readValue} value={t} />}
        </I18nContext.Consumer>
      </I18n>
    );
    render(tree);
    const calledValue = readValue.mock.lastCall?.[0];
    expect(typeof calledValue).toBe('function');
    expect(calledValue!.toString()).toContain('function t');
    expect(calledValue!('phrase')).toBe('Message');
  });

  it('should update after a change in locale', () => {
    const Tree = ({ locale }: Pick<I18nProps, 'locale'>) => (
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
    const readValue = jest.fn((v: tFunction) => v);
    const Tree = ({ phrases }: Pick<I18nProps, 'phrases'>) => (
      <I18n locale="en" phrases={phrases}>
        <I18nContext.Consumer>
          {({ t }) => <ValueTester callback={readValue} value={t} />}
        </I18nContext.Consumer>
      </I18n>
    );
    const { rerender } = render(<Tree phrases={{ test: 'Test' }} />);
    const firstValue = readValue.mock.lastCall?.[0];
    expect(typeof firstValue).toBe('function');
    expect(firstValue!('test')).toBe('Test');

    rerender(<Tree phrases={{ test: 'Expected' }} />);
    const secondValue = readValue.mock.lastCall?.[0];
    expect(typeof secondValue).toBe('function');
    expect(secondValue!('test')).toBe('Expected');
  });
});
