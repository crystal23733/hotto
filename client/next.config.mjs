/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  // Customize the page extensions if needed
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Customize the Next.js source folder
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./src'));
    // Resolve `shared` directory
    config.resolve.alias['@shared'] = path.resolve(__dirname, '../shared');
    return config;
  },

  // Adjust the base path if needed
  basePath: '',

  // Enable support for absolute imports
  experimental: {
    srcDir: true,
  },
};
