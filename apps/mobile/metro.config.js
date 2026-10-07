// oxlint-disable unicorn/prefer-module

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const { withUniwindConfig } = require('uniwind/metro')
const path = require('node:path')

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../../')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot)

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
]

const conformRegex = /\/\.conform\..*/
if (Array.isArray(config.resolver.blockList))
  config.resolver.blockList.push(conformRegex)
else if (config.resolver.blockList)
  config.resolver.blockList = [config.resolver.blockList, conformRegex]
else config.resolver.blockList = [conformRegex]

module.exports = withUniwindConfig(config, {
  cssEntryFile: './globals.css',
  dtsFile: 'uniwind-types.d.ts',
})
