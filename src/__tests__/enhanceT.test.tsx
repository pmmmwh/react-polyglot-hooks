import * as React from 'react';
import { render } from '@testing-library/react';
import Polyglot from 'node-polyglot';
import enhanceT from '../enhanceT';

describe('Enhance T', () => {
  const polyglot = new Polyglot({
    locale: 'en',
    phrases: {
      phrase: 'Message',
      count: 'Count: %{smart_count}',
      interpolation: 'Interpolated: %{message}',
      rich_text: '%{component}',
      rich_text_leading: 'Leading %{component}',
      rich_text_trailing: '%{component} Trailing',
    },
  });

  const enhancedT = enhanceT(polyglot.t.bind(polyglot));

  it('should return a phrase', () => {
    const callResult = enhancedT('phrase');
    expect(callResult).toBe('Message');
  });

  it('should interpolate object values to a phrase', () => {
    const callResult = enhancedT('interpolation', {
      message: 'Success!',
    });
    expect(callResult).toBe('Interpolated: Success!');
  });

  it('should interpolate number to a phrase', () => {
    const callResult = enhancedT('count', 1);
    expect(callResult).toBe('Count: 1');
  });

  it('should interpolate smart count to a phrase', () => {
    const callResult = enhancedT('count', { smart_count: 1 });
    expect(callResult).toBe('Count: 1');
  });

  // Because we are testing against an array of ReactNodes here,
  // we need a full render to allow effective and meaningful comparisons
  describe('when component interpolations are received', () => {
    it('should interpolate component to a phrase', () => {
      const testComponent = <b data-testid="ComponentID">Component</b>;
      const { getByTestId } = render(
        enhancedT('rich_text', { component: testComponent })
      );
      expect(getByTestId('ComponentID')).toBeInTheDocument();
      expect(
        document.querySelector('b[data-testid="ComponentID"]')
      ).toBeInTheDocument();
      expect(getByTestId('ComponentID').textContent).toBe('Component');
    });

    it('should interpolate component with leading string to a phrase', () => {
      const testComponent = <b data-testid="ComponentID">Component</b>;
      const { getByText, getByTestId } = render(
        enhancedT('rich_text_leading', { component: testComponent })
      );
      expect(getByText(/^Leading/)).toBeInTheDocument();
      expect(getByTestId('ComponentID')).toBeInTheDocument();
      expect(getByText(/^Leading/)).toContainElement(
        getByTestId('ComponentID')
      );
      expect(getByText(/^Leading/).textContent).toBe('Leading Component');
    });

    it('should interpolate component with trailing string to a phrase', () => {
      const testComponent = <b data-testid="ComponentID">Component</b>;
      const { getByText, getByTestId } = render(
        enhancedT('rich_text_trailing', { component: testComponent })
      );
      expect(getByText(/Trailing$/)).toBeInTheDocument();
      expect(getByTestId('ComponentID')).toBeInTheDocument();
      expect(getByText(/Trailing$/)).toContainElement(
        getByTestId('ComponentID')
      );
      expect(getByText(/Trailing$/).textContent).toBe('Component Trailing');
    });
  });

  describe('when the called phrase is not found', () => {
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

    it('should return the key and emit a warning', () => {
      const callResult = enhancedT('unavailable');
      expect(callResult).toBe('unavailable');
      expect(consoleOutput).toHaveLength(1);
      expect(consoleOutput[0]).toBe(
        'Warning: Missing translation for key: "unavailable"'
      );
    });

    it('should not interpolate without a fallback', () => {
      const callResult = enhancedT('unavailable', {
        message: 'Failed!',
      });
      expect(callResult).not.toContain('Failed!');
      expect(callResult).toBe('unavailable');
    });

    it('should interpolate to the fallback when available', () => {
      const callResult = enhancedT('unavailable', {
        _: 'Fallback: %{message}',
        message: 'Success!',
      });
      expect(callResult).not.toContain('unavailable');
      expect(callResult).toBe('Fallback: Success!');
    });
  });
});
