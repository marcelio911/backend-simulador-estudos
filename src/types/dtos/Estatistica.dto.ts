import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class EstatisticaDto {
  @IsNotEmpty()
  @IsString()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  concursoId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  totalSimulacoes: number;

  @IsNotEmpty()
  @IsNumber()
  totalAcertos: number;

  @IsNotEmpty()
  @IsNumber()
  totalErros: number;

  @IsArray()
  dificuldades: Map<string, number>;
}
