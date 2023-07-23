import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packagePath = join('..', '..', 'package.json')
const packageURL = fileURLToPath(new URL(packagePath, import.meta.url))
const packageJson = JSON.parse(readFileSync(packageURL).toString())

// Create truncated package.json for distribution
const distPackagePath = join('..', '..', 'dist', 'package.json')
const distPackageURL = fileURLToPath(new URL(distPackagePath, import.meta.url))

delete packageJson.devDependencies
delete packageJson.files
delete packageJson.packageManager
delete packageJson.scripts
packageJson.main = 'index.js'
packageJson.types = 'types/index.d.ts'
const distPackageContents = JSON.stringify(packageJson, null, '  ')
writeFileSync(distPackageURL, distPackageContents.concat('\n'))

// Copy README and LICENSE
const docFilePaths = [
  {
    source: join('..', '..', 'README.md'),
    destination: join('..', '..', 'dist', 'README.md'),
  },
  {
    source: join('..', '..', '..', '..', 'LICENSE.md'),
    destination: join('..', '..', 'dist', 'LICENSE.md'),
  },
]
docFilePaths.forEach(({ source, destination }) => {
  copyFileSync(
    fileURLToPath(new URL(source, import.meta.url)),
    fileURLToPath(new URL(destination, import.meta.url))
  )
})
