import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Simulacao } from './model/simulacao.schema';

@Injectable()
export class SimulacaoService {
  constructor(
    @InjectModel(Simulacao.name) private simulacaoModel: Model<Simulacao>,
  ) { }

  async create(createSimulacaoDto: any): Promise<Simulacao> {
    const createdSimulacao = new this.simulacaoModel(createSimulacaoDto);
    return createdSimulacao.save();
  }

  async findByConcursoUserId(
    concursoId: string,
    userId: string,
  ): Promise<Simulacao[]> {
    return this.simulacaoModel.find({ userId, concursoId }).exec();
  }

  async findById(id: string): Promise<Simulacao> {
    return this.simulacaoModel.findById(id).exec();
  }

  async deleteAll(): Promise<void> {
    await this.simulacaoModel.deleteMany({});
  }
}
