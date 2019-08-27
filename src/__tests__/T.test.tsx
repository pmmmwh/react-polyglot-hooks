import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import I18n from '../I18n';
import T from '../T';

describe('T Component', () => {
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

  it('should render key and warn without context', () => {
    const { getByText } = render(<T phrase="phrase" />);
    expect(getByText('phrase')).toBeInTheDocument();
    expect(consoleOutput).toHaveLength(1);
    expect(consoleOutput[0]).toBe(
      'Warning: t is called without Polyglot context. Perhaps you need to wrap the component in <I18n>?'
    );
  });

  it('should render available message with context', () => {
    const tree = (
      <I18n locale="en" phrases={{ phrase: 'Message' }}>
        <T phrase="phrase" />
      </I18n>
    );
    const { getByText, queryByText } = render(tree);
    expect(queryByText('phrase')).not.toBeInTheDocument();
    expect(getByText('Message')).toBeInTheDocument();
    expect(consoleOutput).toHaveLength(0);
  });

  it('should render key and warn for unavailable message with context', () => {
    const tree = (
      <I18n locale="en" phrases={{ phrase: 'Message' }}>
        <T phrase="unavailable" />
      </I18n>
    );
    const { getByText, queryByText } = render(tree);
    expect(queryByText('phrase')).not.toBeInTheDocument();
    expect(queryByText('Message')).not.toBeInTheDocument();
    expect(getByText('unavailable')).toBeInTheDocument();
    expect(consoleOutput).toHaveLength(1);
    expect(consoleOutput[0]).toBe(
      'Warning: Missing translation for key: "unavailable"'
    );
  });
});
