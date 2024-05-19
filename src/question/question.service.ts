import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from './repository/question.repository';
import { Question } from './model/question.schema';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
@Injectable()
export class QuestionService {
  constructor(private questionsRepository: QuestionsRepository) { }

  async createQuestion(questionData: Question): Promise<void> {
    await this.questionsRepository.createQuestion(questionData);
  }

  async getQuestionById(id: string): Promise<Question | null> {
    return this.questionsRepository.getQuestionById(id);
  }

  async updateQuestion(id: string, questionData: Question): Promise<void> {
    await this.questionsRepository.updateQuestion(id, questionData);
  }

  async deleteQuestion(id: string): Promise<void> {
    await this.questionsRepository.deleteQuestion(id);
  }

  async getAllRandomQuestions(): Promise<Question[]> {
    const sliceArray = async (array: Question[]) => {
      let i = 0;
      const reordernedArray = [];
      for await (const question of array) {
        i++;
        const order = Object.assign({}, question);
        console.log('order::: ', order);
        const prefix = `${i}) `;
        order.questionText = prefix.concat(order.questionText?.slice(2).trim());
        reordernedArray.push(order);
      }
      return reordernedArray;
    };

    const randomizeQuestions = async (array: Question[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return await sliceArray(array);
    };

    return randomizeQuestions(await this.findAll());
  }

  async findAll(): Promise<Question[]> {
    return this.questionsRepository.findAll();
  }

  async deleteAll(): Promise<void> {
    this.questionsRepository.deleteAll();
  }

  // curl -X POST http://localhost:3000/questions/import -H "Content-Type: application/json" -d '{"filePath": "/path/to/SIMULADO+IFS+-+COM+GABARITO.docx"}'

  async importQuestions(
    pdfFilePath: string,
    concursoId: string,
  ): Promise<void> {
    const dataBuffer = fs.readFileSync(pdfFilePath);
    const data = await pdfParse(dataBuffer);

    const lines = data.text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);
    const questions = [];
    let currentQuestion = null;
    let capturingQuestionText = false;

    for (const line of lines) {
      if (line.match(/^\d+\)/)) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          questionText: line,
          options: [],
          correctAnswer: '',
          concursoId,
        };
        capturingQuestionText = true;
      } else if (capturingQuestionText) {
        if (line.match(/^[a-d]\)/)) {
          capturingQuestionText = false;
          const option = line.slice(3).trim();
          console.log('line::: ', line);
          console.log('option::: ', option);
          if (line.includes('<b>') || line.includes('**')) {
            // Supondo que o texto em negrito será marcado assim no PDF
            currentQuestion.correctAnswer = line;
          }
          currentQuestion.options.push(line);
        } else {
          currentQuestion.questionText += ` ${line}`;
        }
      } else if (line.match(/^[a-d]\)/)) {
        if (line.includes('<b>') || line.includes('**')) {
          // Supondo que o texto em negrito será marcado assim no PDF
          currentQuestion.correctAnswer = line;
        }
        currentQuestion.options.push(line);
      }
    }

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    for (const question of questions) {
      await this.createQuestion(question);
    }
  }
}
