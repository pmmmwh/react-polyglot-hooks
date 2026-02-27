import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'expect' {
  interface AsymmetricMatchers extends TestingLibraryMatchers<(str: string) => any, void> {}
  interface Matchers<R extends void | Promise<void>, T = unknown> extends TestingLibraryMatchers<
    (str: string) => any,
    R
  > {}
}
