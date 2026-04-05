import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@refhire/db';

@Global()
@Module({
  providers: [
    {
      provide: PrismaClient,
      useFactory: () => {
        const client = new PrismaClient();
        client.$connect();
        return client;
      },
    },
  ],
  exports: [PrismaClient],
})
export class PrismaModule {}
