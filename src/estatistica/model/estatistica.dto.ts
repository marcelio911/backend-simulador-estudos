import { QuestionDto } from 'src/question/model/question.dto';

export interface EstatisticaDto {
  userId: string;
  concursoId: string;
  simulacaoId: string;

  simulacaoName: string;
  question: QuestionDto;
  dateTime: number;
}
