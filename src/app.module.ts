import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { ConcursoModule } from './concurso/concurso.module';
import { SimulacaoModule } from './simulacao/simulacao.module';
import { EstatisticaModule } from './estatistica/estatistica.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
      // load: [configuration],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: encodeURIComponent(configService.get<string>('MONGO_URI')),
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRoot(
      `mongodb+srv://${
        process.env.USER_DB
          ? encodeURIComponent(process.env.USER_DB as string) + ':'
          : ''
      }${
        process.env.PASS_DB
          ? encodeURIComponent(process.env.PASS_DB as string) + '@'
          : ''
      }${process.env.HOST_DB}/${process.env.NAME_DB}?retryWrites=true&w=majority`,
      {
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('is connected');
          });
          connection._events.connected();
          return connection;
        },
      },
    ),
    QuestionModule,
    ConcursoModule,
    SimulacaoModule,
    EstatisticaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
