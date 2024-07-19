/** @type {import('next').NextConfig} */
import path from 'path';

export default {
  // Customize the page extensions if needed
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Customize the Next.js source folder
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
  
  // Adjust the base path if needed
  basePath: '',
  
  // Enable support for absolute imports
  experimental: {
    srcDir: true,
  },
};
