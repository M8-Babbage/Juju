import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
      '@assets/(.*)': '<rootDir>/src/assets/$1',
      '@env': '<rootDir>/src/environments/environment'
    }
    // transformIgnorePatterns: ['node_modules/(?!@angular)/'],
  };
};
