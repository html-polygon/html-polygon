// @ts-check

/**
 * @type {import('@swc/core/types').Options}
 */
const swcConfig = {
  module: {
    type: 'commonjs',
  },
  jsc: {
    parser: {
      syntax: 'typescript',
    },
  },
  envName: 'test',
  swcrc: false,
}

/**
 * @typedef {import('jest').Config['projects']} Projects
 * @type Exclude<Exclude<Projects, undefined>[number], string>
 */
const projectDefaultConfig = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      // @ts-expect-error swc options are not assignable
      swcConfig,
    ],
  },
  modulePathIgnorePatterns: ['/dist/', '/__snapshots__/'],
}

/**
 * @type {import('jest').Config}
 */
const jestConfig = {
  projects: [
    {
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/core/**/__tests__/**/*'],
      ...projectDefaultConfig,
    },
    {
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/packages/react/**/__tests__/**/*'],
      ...projectDefaultConfig,
    },
  ],
}

// eslint-disable-next-line no-undef
module.exports = jestConfig
