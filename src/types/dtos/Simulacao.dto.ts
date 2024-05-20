import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
  IsObject,
  IsNumber,
} from 'class-validator';

export class SimulacaoDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  concursoId: string;

  @IsArray()
  questionIds: string[];

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @IsObject()
  questionTimes: Map<string, number>;

  @IsObject()
  questionDifficulties: Map<string, boolean>;

  @IsObject()
  questionResults: Map<string, boolean>;

  @IsNumber()
  correctAnswers: number;

  @IsNumber()
  totalAnswers: number;
}
