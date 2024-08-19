import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { Application } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const expressApp: Application = app.getHttpAdapter().getInstance();

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API-Gerenciador-de-Eventos',
        version: '2.0.0',
        description:
          'Gerenciador de Eventos é uma plataforma desenvolvida em Node.js e TypeScript, utilizando MongoDB para o armazenamento de dados. O sistema, encapsulado em Docker e estruturado segundo a arquitetura MVC, permite a criacão de usuários e a gestão de eventos, incluindo funcionalidades de CRUD. É uma solução prática de controle sobre eventos e cadastro de usuários, com facilidade de manutenção e operação.',
        contact: {
          name: 'Fernando Mercado',
          email: 'fermercado@live.com',
        },
      },
    },
    apis: ['./src/docs/user-api.yaml', './src/docs/event-api.yaml'],
  };

  const specs = swaggerJsDoc(options);

  expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  await app.listen(3000);
}

bootstrap();
