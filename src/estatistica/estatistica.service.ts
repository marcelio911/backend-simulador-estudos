import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estatistica } from './model/estatistica.schema';
import { EstatisticaDto } from './model/estatistica.dto';

@Injectable()
export class EstatisticaService {
  constructor(
    @InjectModel(Estatistica.name)
    private EstatisticaModel: Model<Estatistica>,
  ) {}

  async update(
    id: string,
    createEstatisticaDto: Partial<EstatisticaDto>,
  ): Promise<Estatistica> {
    const createdEstatistica = await this.EstatisticaModel.findByIdAndUpdate(
      id,
      createEstatisticaDto,
      { new: true },
    );
    return createdEstatistica;
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
