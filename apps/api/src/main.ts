import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

// Global server instance for caching
const server = express();
let cachedApp: any;

export const createServer = async (expressInstance: any) => {
  if (cachedApp) return cachedApp;
  
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    { logger: ['error', 'warn'] } // Reduce log noise in production
  );
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  
  await app.init();
  cachedApp = app;
  return app;
};

// Vercel serverless handler with high-speed caching
export default async (req: any, res: any) => {
  try {
    await createServer(server);
    return server(req, res);
  } catch (err: any) {
    console.error('CRITICAL STARTUP ERROR:', err.message);
    res.status(500).send('API Cluster Initialization Failed: ' + err.message);
  }
};
