import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { argv } from 'node:process'
import { fileURLToPath } from 'node:url'

import semverInc from 'semver/functions/inc'

const rootPackagePath = join('..', 'package.json')
const rootPackageURL = fileURLToPath(new URL(rootPackagePath, import.meta.url))
const rootPackageJson = JSON.parse(readFileSync(rootPackageURL).toString())

const rootCurrentVersion = rootPackageJson.version
console.info(`--> Current root version is ${rootCurrentVersion}`)

const versionElement = argv[2].replace(/^--([^\s+])/, '$1')
if (!['patch', 'minor', 'major'].includes(versionElement)) {
  console.error('! Error: the requested version element is not valid')
  process.exit(1)
}
console.info(`--> Will increment the ${versionElement} version`)

const newVersion = semverInc(rootCurrentVersion, versionElement)
console.info(`--> The new version will be ${newVersion}`)

console.info('')
console.info('--> Packages:')

const packageNames = ['core', 'react', 'vue']
const packageJsons: [string, unknown][] = []
packageNames.forEach((packageName) => {
  console.info(`----> ${packageName} package`)

  const packagePath = join('..', 'packages', packageName, 'package.json')
  const packageURL = fileURLToPath(new URL(packagePath, import.meta.url))
  const packageJson = JSON.parse(readFileSync(packageURL).toString())

  const currentVersion = packageJson.version
  console.info(`------> Current package version is ${currentVersion}`)
  if (rootCurrentVersion !== currentVersion) {
    console.error('! Error: misaligned package version')
    process.exit(2)
  }

  if (packageName !== 'core') {
    const corePackageVersion = packageJson.dependencies['@html-polygon/core']
    console.info(
      `------> Current core dependency version is ${corePackageVersion}`,
    )
    if (rootCurrentVersion !== corePackageVersion) {
      console.error('! Error: misaligned core dependency version')
      process.exit(3)
    }

    packageJson.dependencies['@html-polygon/core'] = newVersion
  }

  packageJson.version = newVersion
  packageJsons.push([packageURL, packageJson])
})

console.info('')
rootPackageJson.version = newVersion
const rootPackageContents = JSON.stringify(rootPackageJson, null, '  ')
writeFileSync(rootPackageURL, rootPackageContents.concat('\n'))
console.info(`--> Wrote ${rootPackageURL}`)

packageJsons.forEach(([packageURL, packageJson]) => {
  const packageContents = JSON.stringify(packageJson, null, '  ')
  writeFileSync(packageURL, packageContents.concat('\n'))
  console.info(`--> Wrote ${packageURL}`)
})

console.info('')
console.info('Now run pnpm install!!!')
console.info('')
