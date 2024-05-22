import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as functions from 'firebase-functions';
import * as express from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const expressServer = express();
const config = process.env;

const bootstrap = async (expressInstance?): Promise<void> => {
  const config = process.env;

  console.log('config', config.ENV);
  const httpsOptions = {
    key: readFileSync('./src/cert/key.pem'),
    cert: readFileSync('./src/cert/cert.pem'),
  };
  const app =
    config.ENV === 'firebase'
      ? await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))
      : await NestFactory.create(AppModule, { httpsOptions } as any);
  app.enableCors();
  // BEGIN SWAGGER CONFIG ---------------------------------------
  const packageFile = resolve(__dirname, '../package.json');
  const pkg = JSON.parse(readFileSync(packageFile).toString());
  const documentBuilder = new DocumentBuilder()
    .setTitle(`${pkg.name} exemplos de uso NestJS com Firebase Functions`)
    .setDescription(pkg.description)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/swagger', app, document);
  //END SWAGGER CONFIG ------------------------------------

  app.enableCors();
  if (config.ENV === 'firebase') {
    console.log('app.init');
    app.init();
    return;
  }
  await app.listen(3000);
};

export const simulator = functions.https.onRequest(
  async (request, response) => {
    await bootstrap(expressServer);
    expressServer(request, response);
  },
);

if (config.ENV !== 'firebase') {
  bootstrap();
}
