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
        url:  process.env.NODE_DEV == "development" ? 'http://localhost:4000' : "https://personal-finance-track-exercise-4-node-js.onrender.com"
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