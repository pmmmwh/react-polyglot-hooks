// Override Type definitions for node-polyglot v2.4.0
// TODO: Remove after types are merged to DefinitelyTyped
import { InterpolationOptions } from 'node-polyglot';

declare module 'node-polyglot' {
  interface InterpolationParams {
    suffix?: string;
    prefix?: string;
  }

  interface PluralType {
    [pluralType: string]: (count: number) => void;
  }

  interface PluralTypeToLanguages {
    [pluralType: string]: string[];
  }

  interface PluralRules {
    pluralTypes?: PluralType;
    pluralTypeToLanguages?: PluralTypeToLanguages;
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
    pluralRules: PluralRules;
  }
}
