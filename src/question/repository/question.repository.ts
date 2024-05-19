import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from '../model/question.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuestionsRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) { }

  async findAll(): Promise<Question[]> {
    return await this.questionModel.find().lean().exec();
  }

  async createQuestion(createQuestionDto: Question): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
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

  async deleteAll(): Promise<void> {
    await this.questionModel.deleteMany({});
  }
}
