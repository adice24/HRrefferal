import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

export const createServer = async (expressInstance: any) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  
  await app.init();
  return app;
};

// Vercel handler
export default async (req: any, res: any) => {
  await createServer(server);
  return server(req, res);
};
