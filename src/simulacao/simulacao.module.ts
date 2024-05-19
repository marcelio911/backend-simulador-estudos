import { Module } from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';
import { SimulacaoController } from './simulacao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Simulacao, SimulacaoSchema } from './model/simulacao.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Simulacao.name, schema: SimulacaoSchema },
    ]),
  ],
  providers: [SimulacaoService],
  controllers: [SimulacaoController],
})
export class SimulacaoModule {}
