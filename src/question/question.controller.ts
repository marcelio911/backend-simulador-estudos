import {
  Controller,
  Post,
  Body,
  Param,
  UploadedFile,
  Delete,
  HttpCode,
  Put,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionService } from './question.service';
import { diskStorage, Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

import { Question } from './model/question.schema';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.getAllRandomQuestions();
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp', // Diretório temporário para salvar o arquivo
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s+/g, '_') +
            '-' +
            uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  // curl -X POST -F "file=@/home/mcl/Downloads/SIMULADO+IFS+-+COM+GABARITO.pdf" -F "concursoId=6649a42f04ffa5b30aca922d" http://localhost:3000/questions/import
  async importQuestions(
    @UploadedFile() file: Multer.File,
    @Body() body: { concursoId: string },
  ): Promise<void> {
    const filePath = file.path;
    try {
      await this.questionService.importQuestions(filePath, body.concursoId);
    } finally {
      // Remove o arquivo temporário após a importação
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete temporary file: ${filePath}`, err);
        }
      });
    }
  }
}
