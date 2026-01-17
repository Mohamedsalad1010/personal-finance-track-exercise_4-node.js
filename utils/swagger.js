import swaggerJSDoc from "swagger-jsdoc";
import dotenv from 'dotenv'


dotenv.config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'personal finance track',
      version: '1.0.0',
      description: 'API documentation for our personal track manager backend'
    },
    servers: [
      {
        url: 'http://localhost:4000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'] // Where your route files live
};


export const swaggerSpec = swaggerJSDoc(options)