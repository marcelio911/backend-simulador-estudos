import { Module } from '@nestjs/common';
import { EstatisticaService } from './estatistica.service';
import { EstatisticaController } from './estatistica.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Estatistica, EstatisticaSchema } from './model/estatistica.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Estatistica.name, schema: EstatisticaSchema },
    ]),
  ],
  providers: [EstatisticaService],
  controllers: [EstatisticaController],
})
export class EstatisticaModule {}
