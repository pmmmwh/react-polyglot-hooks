module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: [],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,ts,tsx}',
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts|tsx)$'],
  modulePaths: [],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
