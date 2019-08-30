import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { I18n, T } from '..';
import { NO_NUMBER_INTERPOLATIONS, NO_POLYGLOT_CONTEXT } from '../constants';

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

  describe('when context is not provided', () => {
    it('should render the key and emit a warning', () => {
      const { getByText } = render(<T phrase="phrase" />);
      expect(getByText('phrase')).toBeInTheDocument();
      expect(consoleOutput).toHaveLength(1);
      expect(consoleOutput[0]).toBe(NO_POLYGLOT_CONTEXT);
    });
  });

  describe('when context is provided', () => {
    describe('when a phrase is not found', () => {
      it('should render the key and emit a warning', () => {
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

      it('should render the fallback without warning', () => {
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

      it('should interpolate values to a fallback', () => {
        const tree = (
          <I18n locale="en" phrases={{ phrase: 'Interpolated: %{message}' }}>
            <T
              phrase="unavailable"
              fallback="Fallback: %{message}"
              interpolations={{ message: 'Success!' }}
            />
          </I18n>
        );
        const { getByText, queryByText } = render(tree);
        expect(queryByText(/^Interpolated:/)).not.toBeInTheDocument();
        expect(getByText(/^Fallback: /)).toBeInTheDocument();
        expect(getByText(/^Fallback: /).textContent).toBe('Fallback: Success!');
      });

      it('should not interpolate values without a fallback', () => {
        const tree = (
          <I18n locale="en" phrases={{ phrase: 'Interpolated: %{message}' }}>
            <T phrase="unavailable" interpolations={{ message: 'Success!' }} />
          </I18n>
        );
        const { getByText, queryByText } = render(tree);
        expect(queryByText(/^Interpolated:/)).not.toBeInTheDocument();
        expect(queryByText(/Success!/)).not.toBeInTheDocument();
        expect(getByText('unavailable')).toBeInTheDocument();
        expect(getByText('unavailable').textContent).toBe('unavailable');
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

      it('should render the phrase even a fallback is provided', () => {
        const tree = (
          <I18n locale="en" phrases={{ phrase: 'Message' }}>
            <T phrase="phrase" fallback="Fallback" />
          </I18n>
        );
        const { getByText, queryByText } = render(tree);
        expect(queryByText('phrase')).not.toBeInTheDocument();
        expect(queryByText('Fallback')).not.toBeInTheDocument();
        expect(getByText('Message')).toBeInTheDocument();
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
          <I18n
            locale="en"
            phrases={{ phrase: 'Interpolated: %{smart_count}' }}
          >
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
          <I18n
            locale="en"
            phrases={{ phrase: 'Interpolated: %{smart_count}' }}
          >
            <T phrase="phrase" count={1} />
          </I18n>
        );
        const { getByText } = render(tree);
        expect(getByText(/^Interpolated:/)).toBeInTheDocument();
        expect(getByText(/^Interpolated:/).textContent).toBe('Interpolated: 1');
      });

      it('should allow interpolations to override count', () => {
        const tree = (
          <I18n
            locale="en"
            phrases={{ phrase: 'Interpolated: %{smart_count}' }}
          >
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
});
