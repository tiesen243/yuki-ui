import type { ConfigContext, ExpoConfig } from 'expo/config'

import * as pkgJson from './package.json' with { type: 'json' }

const appName = pkgJson.name.match(/^@(?<name>[^/]+)\//u)?.at(1) ?? 'mobile'

// oxlint-disable-next-line unicorn/no-anonymous-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: appName.charAt(0).toUpperCase() + appName.slice(1),
  slug: appName,
  scheme: appName,
  version: pkgJson.version,
  orientation: 'portrait',
  // icon: './assets/icon-light.png',
  userInterfaceStyle: 'automatic',
  updates: {
    fallbackToCacheTimeout: 0,
  },

  android: {
    package: `com.${appName}.mobile`,
    adaptiveIcon: {
      // foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#DBE4FF',
      // monochromeImage: './assets/adaptive-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: true,
    permissions: [
      'android.permission.BLUETOOTH',
      'android.permission.BLUETOOTH_ADMIN',
      'android.permission.BLUETOOTH_CONNECT',
      'android.permission.BLUETOOTH_SCAN',
      'android.permission.ACCESS_FINE_LOCATION',
    ],
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: process.env.EXPO_PUBLIC_WEB_URL,
            pathPrefix: '/',
          },
          {
            scheme: 'http',
            host: process.env.EXPO_PUBLIC_WEB_URL,
            pathPrefix: '/',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },

  ios: {
    bundleIdentifier: `com.${appName}.mobile`,
    associatedDomains: [`applinks:${appName}.vercel.app`],
    supportsTablet: true,
    icon: {
      // light: './assets/icon-light.png',
      // dark: './assets/icon-dark.png',
      // tinted: './assets/icon-tinted.png',
    },
  },

  plugins: [
    'expo-font',
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#DBE4FF',
        // image: './assets/icon-light.png',
        imageWidth: 80,
        dark: {
          backgroundColor: '#0D1633',
          // image: './assets/icon-dark.png',
        },
      },
    ],
  ],

  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
    reactCompiler: true,
  },
})
