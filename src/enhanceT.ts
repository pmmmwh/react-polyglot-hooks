import { cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { PolyglotT } from './constants';

// A pseudo-JSX string interpolation identifier
const IDENTIFIER = /<(\d+)\/>/;

const enhanceT = (originalT: PolyglotT) =>
  // We use a named function here to aid debugging
  // ReactNode includes all React render-ables, including arrays
  function t(...[key, interpolations]: Parameters<PolyglotT>): ReactNode {
    if (interpolations === undefined || typeof interpolations === 'number') {
      return originalT(key, interpolations);
    } else {
      // ReactElement used because cloneElement requires a proper ReactElement
      const elementCache: ReactElement[] = [];
      Object.keys(interpolations).forEach(key => {
        // Store all JSX elements into a array cache for processing later
        if (isValidElement(interpolations[key])) {
          elementCache.push(interpolations[key]);
          interpolations[key] = `<${elementCache.length - 1}/>`;
        }
      });

      const tString = originalT(key, interpolations);
      // We can safely return if no element interpolation is needed
      if (!elementCache.length) {
        return tString;
      }

      // Split the string into chunks of strings and interpolation indices
      const tChunks = tString.split(IDENTIFIER);
      // Move the leading string part into the render array and pop it
      const renderItems: Array<ReactNode> = tChunks.splice(0, 1);
      for (let i = 0; i < Math.ceil(tChunks.length); i += 1) {
        const [index, trailingString] = tChunks.splice(0, 2);
        const currentIndex = parseInt(index, 10);
        const currentElement = elementCache[currentIndex];

        // Interpolate the element
        renderItems.push(
          cloneElement(
            currentElement,
            // A unique key is needed when rendering an array
            { key: currentIndex },
            currentElement.props.children
          )
        );

        // Interpolate any trailing string
        if (trailingString) {
          renderItems.push(trailingString);
        }
      }

      return renderItems;
    }
  };

export default enhanceT;
