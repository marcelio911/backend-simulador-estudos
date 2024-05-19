import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './model/question';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Question> {
    return this.questionService.getQuestionById(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() question: Question): Promise<void> {
    this.questionService.createQuestion(question);
  }

  @HttpCode(203)
  @Put()
  async update(@Body() question: Question): Promise<void> {
    this.questionService.updateQuestion(question.id, question);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.questionService.deleteQuestion(id);
  }

  // curl -X DELETE http://localhost:3000/questions
  @Delete()
  deleteAll(): Promise<void> {
    return this.questionService.deleteAll();
  }

  @Post('import')
  async importQuestions(@Body('filePath') filePath: string): Promise<void> {
    await this.questionService.importQuestions(filePath);
  }
}
