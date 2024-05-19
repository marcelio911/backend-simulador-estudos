import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Estatistica extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Concurso',
    required: true,
  })
  concursoId: string;

  @Prop({ type: Map, of: Number })
  questionStats: Map<string, { attempts: number; correct: number }>;

  @Prop()
  lastSimulacaoId: string;
}

export const EstatisticaSchema = SchemaFactory.createForClass(Estatistica);
