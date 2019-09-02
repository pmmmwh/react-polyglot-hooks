import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { I18n, T } from '..';
import { NO_NUMBER_INTERPOLATIONS } from '../constants';

describe('T Component', () => {
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  let consoleOutput: string[] = [];
  beforeEach(() => {
    console.error = (...args: string[]): void => {
      args.forEach(arg => consoleOutput.push(arg));
    };
    console.warn = (...args: string[]): void => {
      args.forEach(arg => consoleOutput.push(arg));
    };
  });

  afterEach(() => {
    consoleOutput = [];
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  describe('when a phrase is not found', () => {
    it('should render the key', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Message' }}>
          <T phrase="unavailable" />
        </I18n>
      );
      const { getByText, queryByText } = render(tree);
      expect(queryByText('phrase')).not.toBeInTheDocument();
      expect(queryByText('Message')).not.toBeInTheDocument();
      expect(getByText('unavailable')).toBeInTheDocument();
    });

    it('should render the fallback when available', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Message' }}>
          <T phrase="unavailable" fallback="Fallback" />
        </I18n>
      );
      const { getByText, queryByText } = render(tree);
      expect(queryByText('phrase')).not.toBeInTheDocument();
      expect(queryByText('Message')).not.toBeInTheDocument();
      expect(getByText('Fallback')).toBeInTheDocument();
      expect(consoleOutput).toHaveLength(0);
    });

    it('should allow interpolations to override fallback', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Message' }}>
          <T
            phrase="unavailable"
            fallback="Incorrect"
            interpolations={{ _: 'Fallback' }}
          />
        </I18n>
      );
      const { getByText, queryByText } = render(tree);
      expect(queryByText('Incorrect')).not.toBeInTheDocument();
      expect(getByText('Fallback')).toBeInTheDocument();
    });
  });

  describe('when a phrase is found', () => {
    it('should render without warning', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Message' }}>
          <T phrase="phrase" />
        </I18n>
      );
      const { getByText } = render(tree);
      expect(getByText('Message')).toBeInTheDocument();
      expect(consoleOutput).toHaveLength(0);
    });

    it('should interpolate values', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Interpolated: %{message}' }}>
          <T phrase="phrase" interpolations={{ message: 'Success!' }} />
        </I18n>
      );
      const { getByText } = render(tree);
      expect(getByText(/^Interpolated:/)).toBeInTheDocument();
      expect(getByText(/^Interpolated:/).textContent).toBe(
        'Interpolated: Success!'
      );
    });

    it('should interpolate number as smart count with deprecation warning', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Interpolated: %{smart_count}' }}>
          <T phrase="phrase" interpolations={1} />
        </I18n>
      );
      const { getByText } = render(tree);
      expect(getByText(/^Interpolated:/)).toBeInTheDocument();
      expect(getByText(/^Interpolated:/).textContent).toBe('Interpolated: 1');
      expect(consoleOutput).toHaveLength(1);
      expect(consoleOutput[0]).toBe(NO_NUMBER_INTERPOLATIONS);
    });

    it('should interpolate count', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Interpolated: %{smart_count}' }}>
          <T phrase="phrase" count={1} />
        </I18n>
      );
      const { getByText } = render(tree);
      expect(getByText(/^Interpolated:/)).toBeInTheDocument();
      expect(getByText(/^Interpolated:/).textContent).toBe('Interpolated: 1');
    });

    it('should allow interpolations to override count', () => {
      const tree = (
        <I18n locale="en" phrases={{ phrase: 'Interpolated: %{smart_count}' }}>
          <T phrase="phrase" count={1} interpolations={{ smart_count: 2 }} />
        </I18n>
      );
      const { getByText, queryByText } = render(tree);
      expect(queryByText(/1$/)).not.toBeInTheDocument();
      expect(getByText(/^Interpolated:/)).toBeInTheDocument();
      expect(getByText(/^Interpolated:/).textContent).toBe('Interpolated: 2');
    });
  });
});
