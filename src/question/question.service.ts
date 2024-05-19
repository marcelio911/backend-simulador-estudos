import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from './repository/question.repository';
import { Question } from './model/question';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class QuestionService {
  constructor(private questionsRepository: QuestionsRepository) { }

  async createQuestion(questionData: Partial<Question>): Promise<void> {
    const id = this.generateId();
    const question = new Question(id, questionData.questionText, questionData.options, questionData.correctAnswer);
    await this.questionsRepository.createQuestion(question);
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

  async findAll(): Promise<Question[]> {
    return this.questionsRepository.findAll();
  }

  async deleteAll(): Promise<void> {
    this.questionsRepository.deleteAll();
  }

  private generateId(): string {
    // Generate a unique ID for the document
    return uuidv4();
  }
  // curl -X POST http://localhost:3000/questions/import -H "Content-Type: application/json" -d '{"filePath": "/path/to/SIMULADO+IFS+-+COM+GABARITO.docx"}'


  async importQuestions(pdfFilePath: string): Promise<void> {
    const dataBuffer = fs.readFileSync(pdfFilePath);
    const data = await pdfParse(dataBuffer);

    const lines = data.text.split('\n').map(line => line.trim()).filter(line => line);
    const questions = [];
    let currentQuestion = null;
    let capturingQuestionText = false;

    for (const line of lines) {
      if (line.match(/^\d+\)/)) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = { questionText: line, options: [], correctAnswer: '' };
        capturingQuestionText = true;
      } else if (capturingQuestionText) {
        if (line.match(/^[a-d]\)/)) {
          capturingQuestionText = false;
          const option = line.slice(3).trim();
          console.log('line::: ', line);
          console.log('option::: ', option);
          if (line.includes('<b>') || line.includes('**')) {  // Supondo que o texto em negrito será marcado assim no PDF
            currentQuestion.correctAnswer = line;
          }
          currentQuestion.options.push(line);
        } else {
          currentQuestion.questionText += ` ${line}`;
        }
      } else if (line.match(/^[a-d]\)/)) {
        const option = line.slice(3).trim();
        if (line.includes('<b>') || line.includes('**')) {  // Supondo que o texto em negrito será marcado assim no PDF
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


  // async importQuestionsPdfReader(pdfFilePath: string): Promise<void> {
  //   const questions = [];
  //   let currentQuestion = null;
  //   let capturingQuestionText = false;

  //   const pdfParser = new pdfreader.PdfReader({});
  //   pdfParser.parseFileItems(pdfFilePath, async function (err, item: any) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     if (!item || item.page) {
  //       return;
  //     }
  //     if (item.text) {
  //       const line = item.text.trim();
  //       if (line.match(/^\d+\)/)) {
  //         if (currentQuestion) {
  //           questions.push(currentQuestion);
  //         }
  //         currentQuestion = { questionText: line, options: [], correctAnswer: '' };
  //         capturingQuestionText = true;
  //       } else if (capturingQuestionText) {
  //         if (line.match(/^[a-d]\)/)) {
  //           capturingQuestionText = false;
  //           const option = line.slice(3).trim();
  //           if (item.bold || line.includes('**')) { // Supondo que a propriedade bold ou ** indiquem texto em negrito
  //             currentQuestion.correctAnswer = option;
  //           }
  //           currentQuestion.options.push(option);
  //         } else {
  //           currentQuestion.questionText += ` ${line}`;
  //         }
  //       } else if (line.match(/^[a-d]\)/)) {
  //         const option = line.slice(3).trim();
  //         if (item.bold || line.includes('**')) { // Supondo que a propriedade bold ou ** indiquem texto em negrito
  //           currentQuestion.correctAnswer = option;
  //         }
  //         currentQuestion.options.push(option);
  //       }

  //       if (currentQuestion) {
  //         questions.push(currentQuestion);
  //       }
  //       for (const question of questions) {
  //         await this.createQuestion(question);
  //       }
  //     }
  //   });

  // }
}
