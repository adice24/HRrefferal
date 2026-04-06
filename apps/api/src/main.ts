import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();
let cachedApp: any;

export const createServer = async (expressInstance: any) => {
  if (cachedApp) return cachedApp;
  
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    { logger: ['error', 'warn'] }
  );
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // High-speed, professional CORS hardening
  app.enableCors({
    origin: [
      'https://h-rrefferal-web.vercel.app',
      'https://h-rrefferal-web-git-main-adice24s-projects.vercel.app',
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  await app.init();
  cachedApp = app;
  return app;
};

export default async (req: any, res: any) => {
  await createServer(server);
  return server(req, res);
};
