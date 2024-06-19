import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { ConcursoModule } from './concurso/concurso.module';
import { SimulacaoModule } from './simulacao/simulacao.module';
import { EstatisticaModule } from './estatistica/estatistica.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PdfToWordOcrModule } from './pdf-to-word-ocr/pdf-to-word-ocr.module';
// import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
      // load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(`${process.env.MONGO_URI}`, {
    //   connectionFactory: (connection) => {
    //     connection.on('connected', () => {
    //       console.log('is connected ', process.env.MONGO_URI);
    //     });
    //     connection._events.connected();
    //     return connection;
    //   },
    // }),
    QuestionModule,
    ConcursoModule,
    SimulacaoModule,
    EstatisticaModule,
    UserModule,
    AuthModule,
    PdfToWordOcrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
