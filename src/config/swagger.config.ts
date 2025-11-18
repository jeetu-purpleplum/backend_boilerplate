import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import basicAuth from 'express-basic-auth';
import { Express } from 'express';
import { config } from './config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Backend API Documentation',
      version: '1.0.0',
      description: 'API documentation for the backend application',
    },
    servers: [
      {
        url: 'http://localhost:5001/api',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.resolve(__dirname, '../docs/*.yaml')],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  const swaggerUser = config.swagger.user;
  const swaggerPassword = config.swagger.password;
  const nodeEnv =  config.env;

  // Only enable Swagger for dev/testing
  if (['LOCAL', 'DEV', 'STAGING'].includes(nodeEnv)) {
    // 🔒 Basic Auth Middleware for Swagger UI
    app.use(
      ['/api/docs', '/api/docs-json'],
      basicAuth({
        challenge: true,
        users: { [swaggerUser]: swaggerPassword },
      })
    );

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log('✅ Swagger Docs available at http://localhost:5001/api/docs');
  } else {
    console.log('🚫 Swagger Docs disabled in production');
  }
};
