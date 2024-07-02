// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API endpoints',
    },
    servers: [
      {
        url: 'http://192.168.1.6:8080/api', // Adjusted URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routess/users.js', './products/routes/route.js'],
};

const specs = swaggerJsdoc(options);
router.use('/', swaggerUi.serve); // Changed route to '/'
router.get('/', swaggerUi.setup(specs)); // Changed route to '/'

module.exports = router;
