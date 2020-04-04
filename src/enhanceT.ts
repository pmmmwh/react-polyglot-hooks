import * as React from 'react';
import type { PolyglotT } from './types';

/**
 * A pseudo-JSX string interpolation identifier.
 */
const IDENTIFIER = /<(\d+)\/>/;

/**
 * A function to enhance Polyglot.js to allow React component interpolations.
 *
 * @param originalT The original t function from Polyglot.js.
 * @returns The enhanced t function.
 */
const enhanceT = (originalT: PolyglotT) => {
  /**
   * The t function for translation.
   *
   * @param key The key of one translate phrase.
   * @param interpolations The nodes to be interpolated to the phrase.
   * @returns A string, or an array of components and strings.
   */
  // The overload included here is to aid code auto-completion
  function t(
    key: Parameters<PolyglotT>[0],
    interpolations?: Parameters<PolyglotT>[1]
  ): React.ReactElement;
  // We use a named function here to aid debugging
  // ReactNode includes all React render-ables, including arrays
  function t(
    ...[key, interpolations]: Parameters<PolyglotT>
  ): React.ReactElement {
    if (interpolations === undefined || typeof interpolations === 'number') {
      return (originalT(
        key,
        interpolations
      ) as React.ReactNode) as React.ReactElement;
    } else {
      // ReactElement used because cloneElement requires a proper ReactElement
      const elementCache: React.ReactElement[] = [];
      Object.keys(interpolations).forEach((key) => {
        // Store all JSX elements into an array cache for processing later
        if (React.isValidElement(interpolations[key])) {
          elementCache.push(interpolations[key]);
          interpolations[key] = `<${elementCache.length - 1}/>`;
        }
      });

      const tString = originalT(key, interpolations);
      // We can safely return if we don't need to do any element interpolation
      if (!elementCache.length) {
        return (tString as React.ReactNode) as React.ReactElement;
      }

      // Split the string into chunks of strings and interpolation indices
      const tChunks = tString.split(IDENTIFIER);
      // Move the leading string part into the render array and pop it
      const renderItems: Array<React.ReactNode> = tChunks.splice(0, 1);
      for (let i = 0; i < Math.ceil(tChunks.length); i += 1) {
        const [index, trailingString] = tChunks.splice(0, 2);
        const currentIndex = parseInt(index, 10);
        const currentElement = elementCache[currentIndex];

        // Interpolate the element
        renderItems.push(
          React.cloneElement(
            currentElement,
            // We need a unique key when rendering an array
            { key: currentIndex },
            currentElement.props.children
          )
        );

        // Interpolate any trailing string
        if (trailingString) {
          renderItems.push(trailingString);
        }
      }

      return (renderItems as React.ReactNode) as React.ReactElement;
    }
  }

  return t;
};

export default enhanceT;
