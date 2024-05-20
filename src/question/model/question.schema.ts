import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  questionText: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Simulacao',
    required: true,
  })
  simulacaoId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
