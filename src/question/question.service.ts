import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from './repository/question.repository';
import { Question } from './model/question.schema';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
@Injectable()
export class QuestionService {
  constructor(private questionsRepository: QuestionsRepository) {}

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

  async getAllRandomQuestions({ simulacaoId }): Promise<Question[]> {
    const sliceArray = async (array: Question[]) => {
      let i = 0;
      const reordernedArray = [];
      for await (const question of array) {
        i++;
        const order = Object.assign({}, question);
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

    return randomizeQuestions(await this.findBySimulacaoId({ simulacaoId }));
  }

  async findBySimulacaoId({ simulacaoId }): Promise<Question[]> {
    return this.questionsRepository.findBySimulacaoId(simulacaoId);
  }

  async deleteAllBySimulacaoId(simulacaoId): Promise<string> {
    return this.questionsRepository.deleteAllBySimulacaoId({ simulacaoId });
  }

  // curl -X POST http://localhost:3000/questions/import -H "Content-Type: application/json" -d '{"filePath": "/path/to/SIMULADO+IFS+-+COM+GABARITO.docx"}'

  async importQuestions(
    pdfFilePath: string,
    simulacaoId: string,
  ): Promise<void> {
    console.log('pdfFilePath::: ', pdfFilePath);
    console.log('simulacaoId::: ', simulacaoId);

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
          correctAnswer: null,
          simulacaoId,
        };
        capturingQuestionText = true;
      } else if (capturingQuestionText) {
        if (line.match(/^[a-e]\)/)) {
          capturingQuestionText = false;
          const option = line.slice(3).trim();
          if (option.includes('<b>') || option.includes('**')) {
            // Supondo que o texto em negrito será marcado assim no PDF
            currentQuestion.correctAnswer = line;
          }
          currentQuestion.options.push(line);
        } else {
          currentQuestion.questionText += ` ${line}`;
        }
      } else if (line.match(/^[a-e]\)/)) {
        const option = line.slice(3).trim();
        if (option.includes('<b>') || option.includes('**')) {
          // Supondo que o texto em negrito será marcado assim no PDF
          currentQuestion.correctAnswer = line;
        }
        currentQuestion.options.push(line);
      }
    }
    if (currentQuestion) {
      questions.push(currentQuestion);
    }
    console.log('questions::: ', questions.length);
    for (const question of questions) {
      if (!question.correctAnswer) {
        console.log('without correct answer:', question);
      }
      await this.createQuestion(question);
    }
    const incorrectAnswers = questions.filter(
      (question) => !question.correctAnswer,
    );
    console.log('incorrectAnswers::: ', incorrectAnswers.length);
    console.log('questions::: ', questions.length);
  }
}
