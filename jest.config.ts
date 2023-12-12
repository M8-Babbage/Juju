import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '@assets/(.*)': '<rootDir>/src/assets/$1',
      '@components/(.*)': '<rootDir>/src/app/components/$1',
      '@environments/(.*)': '<rootDir>/src/environments/$1',
      '@models/(.*)': '<rootDir>/src/app/models/$1',
      '@services/(.*)': '<rootDir>/src/app/services/$1',
      '@views/(.*)': '<rootDir>/src/app/views/$1',
      '@data/(.*)': '<rootDir>/src/app/data/$1'
    }
    // transformIgnorePatterns: ['node_modules/(?!@angular)/'],
  };
};
