// const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger/docs/DocSwagger.yaml'));

/**
 * Thiết lập Swagger Docs với cấu hình tùy chỉnh
 * @param {object} app - Đối tượng ứng dụng Express
 */
const setupSwaggerDocs = app => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        docExpansion: 'none',
        // defaultModelsExpandDepth: -1,
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
        filter: true,
        deepLinking: true,
      },
    })
  );
};

module.exports = setupSwaggerDocs;
