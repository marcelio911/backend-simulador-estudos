import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Repository } from 'typeorm';
import { QuestionsRepository } from './repository/question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './model/question';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService, QuestionsRepository, Repository],
  controllers: [QuestionController],
})
export class QuestionModule { }
