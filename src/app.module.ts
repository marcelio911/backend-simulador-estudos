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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    // MongooseModule.forRoot(
    //   'mongodb://myuser:mypassword@localhost:27017/nest',
    //   {},
    // ),
    MongooseModule.forRoot(
      `mongodb+srv://${
        process.env.USER_DB
          ? encodeURIComponent(process.env.USER_DB as string) + ':'
          : ''
      }${
        process.env.PASS_DB
          ? encodeURIComponent(process.env.PASS_DB as string) + '@'
          : ''
      }${process.env.HOST_DB}`,
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
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
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
