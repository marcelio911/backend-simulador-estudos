import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from '../model/question.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuestionsRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.questionModel.find().lean().exec();
  }

  async findBySimulacaoId(simulacaoId: string): Promise<Question[]> {
    try {
      const simulacaoObjectId = new Types.ObjectId(simulacaoId);
      return await this.questionModel
        .find({
          simulacaoId: simulacaoObjectId,
        })
        .lean()
        .exec();
    } catch (error) {
      console.error('Error in findBySimulacaoId:', error);
      throw error;
    }
  }

  async createQuestion(createQuestionDto: Question): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  async createAllQuestion(createQuestionDto: Question[]): Promise<Question[]> {
    return await this.questionModel.create(createQuestionDto);
  }

  async getQuestionById(id: string): Promise<Question | null> {
    const question = await this.questionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async updateQuestion(
    id: string,
    update: Partial<Question>,
  ): Promise<Question> {
    const existingQuestion = await this.questionModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return existingQuestion;
  }

  async deleteQuestion(id: string): Promise<void> {
    await this.questionModel.findByIdAndDelete(id).exec();
  }

  async deleteAllBySimulacaoId({ simulacaoId }): Promise<string> {
    try {
      await this.questionModel.deleteMany({
        simulacaoId: new Types.ObjectId(simulacaoId),
      });
      return `Documentos da simulacaoId: ${simulacaoId} excluídos com sucesso!`;
    } catch (error) {
      console.error('Erro ao excluir documentos:', error);
      // Lide com o erro conforme necessário
    }
  }
}
