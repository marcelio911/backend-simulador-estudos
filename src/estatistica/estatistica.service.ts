import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estatistica } from './model/estatistica.schema';

@Injectable()
export class EstatisticaService {
  constructor(
    @InjectModel(Estatistica.name)
    private EstatisticaModel: Model<Estatistica>,
  ) {}

  async create(createEstatisticaDto: any): Promise<Estatistica> {
    const createdEstatistica = new this.EstatisticaModel(createEstatisticaDto);
    return createdEstatistica.save();
  }

  async findByUserId(userId: string): Promise<Estatistica[]> {
    return this.EstatisticaModel.find({ userId }).exec();
  }

  async findById(id: string): Promise<Estatistica> {
    return this.EstatisticaModel.findById(id).exec();
  }

  async deleteAll(): Promise<void> {
    await this.EstatisticaModel.deleteMany({});
  }
}
