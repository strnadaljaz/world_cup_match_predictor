const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}'],
}

module.exports = createJestConfig(customJestConfig)
