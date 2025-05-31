const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Booking API',
      version: '1.0.0',
      description: 'API documentation for Car Booking App',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update if needed
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);
module.exports = specs;
