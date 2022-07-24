const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for finding beer',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from Punk Api.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Sagar Roy',
        email: 'sagarbhp@outlook.com',
      },
    },
  };

exports.swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [ './routes/*.routes.js'],
};