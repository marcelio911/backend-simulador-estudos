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

  console.log('protocol ::', config.PROTOCOL);

  const LETS_ENCRYPT = (config.PROTOCOL === 'letsencrypt');
  console.log('SSL ::', LETS_ENCRYPT);

  const httpsOptions = {
    key: readFileSync(LETS_ENCRYPT ? '/etc/letsencrypt/live/backendsimulator.systentando.com/privkey.pem' : 'src/cert/key.pem'),
    cert: readFileSync(LETS_ENCRYPT ? '/etc/letsencrypt/live/backendsimulator.systentando.com/fullchain.pem' : 'src/cert/cert.pem'),
  };
  let app;
  if (config.ENV === 'firebase') {
    app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))
  } else if (config.PROTOCOL === 'https') {
    app = await NestFactory.create(AppModule, { httpsOptions } as any)
  } else {
    app = await NestFactory.create(AppModule);
  }
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
console.log('config', config.ENV);

if (config.ENV !== 'firebase') {
  bootstrap();
}