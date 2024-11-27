module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    rootDir: '.',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', 
    },
    testRegex: '.*\\.spec\\.ts$', 
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest', 
    },
    collectCoverageFrom: [
      '**/*.(t|j)s',
    ],
    coverageDirectory: './coverage',
  };