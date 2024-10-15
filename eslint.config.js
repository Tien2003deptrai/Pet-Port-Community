// eslint.config.js
module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        // Cấu hình các biến toàn cục cho môi trường Node.js và ES2021
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'indent': ['error', 2], // Thụt lề bằng 2 spaces
      'quotes': ['error', 'single'], // Sử dụng dấu nháy đơn
      'semi': ['error', 'always'], // Bắt buộc sử dụng dấu chấm phẩy
      'no-console': 'off', // Cho phép sử dụng console.log
      'no-unused-vars': ['warn'], // Cảnh báo nếu biến không được sử dụng
      'eqeqeq': 'error', // Bắt buộc sử dụng === và !==
      'no-var': 'error', // Không cho phép sử dụng var, thay bằng let/const
      'prefer-const': 'error', // Khuyến khích sử dụng const khi có thể
    },
  },
];
