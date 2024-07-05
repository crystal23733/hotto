module.exports = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // React를 사용하는 경우
    'plugin:@typescript-eslint/recommended', // TypeScript를 사용하는 경우
    'prettier', // Prettier와 충돌되는 ESLint 규칙을 덮어쓰기 위한 설정
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 추가적인 규칙 설정 가능
  },
};
