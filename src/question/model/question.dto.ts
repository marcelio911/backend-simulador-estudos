import { Question } from './question.schema';

export interface QuestionDto {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  simulacaoId: string;
}

export const adapterQuestionDto = (data: Question | any): QuestionDto => {
  return {
    _id: data._id as unknown as string,
    questionText: data.questionText,
    options: data.options,
    correctAnswer: data.correctAnswer,
    simulacaoId: data.simulacaoId,
  };
};

export const adapterArrayQuestionDto = (
  data: Question[] | any[],
): QuestionDto[] => {
  return data.map((question) => adapterQuestionDto(question));
};
