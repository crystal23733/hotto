// next.config.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    externalDir: true
  }
};

// 개발 환경에서 HTTPS 설정
if (process.env.NODE_ENV === 'development') {
  nextConfig.server = {
    https: {
      key: fs.readFileSync(path.join(__dirname, '../certs/localhost+2-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../certs/localhost+2.pem'))
    }
  };
}

export default nextConfig;