import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as functions from 'firebase-functions';
import * as express from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const expressServer = express();

const bootstrap = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  // BEGIN SWAGGER CONFIG ---------------------------------------
  const packageFile = resolve(__dirname, '../package.json');
  const pkg = JSON.parse(readFileSync(packageFile).toString());
  const config = new DocumentBuilder()
    .setTitle(`${pkg.name} exemplos de uso NestJS com Firebase Functions`)
    .setDescription(pkg.description)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  //END SWAGGER CONFIG ------------------------------------

  app.enableCors();
  // await app.listen(3000);

  app.init();
};

export const simulator = functions.https.onRequest(
  async (request, response) => {
    await bootstrap(expressServer);
    expressServer(request, response);
  },
);
