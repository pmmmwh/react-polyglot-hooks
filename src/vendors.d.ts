// Override Type definitions for node-polyglot v2.3.1
// TODO: Remove after PR is merged in DefinitelyTyped
import { InterpolationOptions, PolyglotOptions } from 'node-polyglot';

declare module 'node-polyglot' {
  interface InterpolationParams {
    suffix?: string;
    prefix?: string;
  }

  interface PolyglotOptions {
    phrases?: any;
    locale?: string;
    allowMissing?: boolean;
    onMissingKey?: (
      key: string,
      options?: InterpolationOptions,
      locale?: string
    ) => string;
    interpolation?: InterpolationParams;
  }
}
