/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

const withPWA = require('next-pwa')({
  dest: 'public',

  disable: isDev,

  buildExcludes: ['app-build-manifest.json'],
});

const withMDX = createMDX({});

const generateAppDirEntry = (entry: any) => {
  const packagePath = require.resolve('next-pwa');

  const packageDirectory = path.dirname(packagePath);

  const registerJs = path.join(packageDirectory, 'register.js');

  return entry().then((entries: any) => {
    // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427

    if (entries['main-app'] && !entries['main-app'].includes(registerJs)) {
      if (Array.isArray(entries['main-app'])) {
        entries['main-app'].unshift(registerJs);
      } else if (typeof entries['main-app'] === 'string') {
        entries['main-app'] = [registerJs, entries['main-app']];
      }
    }

    return entries;
  });
};

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  reactStrictMode: true,

  webpack(config: any) {
    if (!isDev) {
      const entry = generateAppDirEntry(config.entry);

      config.entry = () => entry;
    }

    return config;
  },
};

module.exports = withPWA(withMDX(nextConfig));
