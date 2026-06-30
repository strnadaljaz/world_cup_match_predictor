module.exports = {
  testEnvironment: "node",

  rootDir: ".",

  testMatch: ["<rootDir>/tests/**/*.test.(js|ts|tsx)"],

  testPathIgnorePatterns: [
    "/node_modules/",
    "../web-interface/",
  ],
}
