import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module.js';
import { ObserveInstrument } from './observe.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument,
  });
  app.enableCors();
  
  // public_htmlフォルダを静的ファイルとして公開
  app.useStaticAssets(join(import.meta.dirname, '..', 'public_html'));
  
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
