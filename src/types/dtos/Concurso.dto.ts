import { IsNotEmpty, IsString, IsDate, IsArray } from 'class-validator';

export class ConcursoDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  temasGerais: string;

  @IsNotEmpty()
  @IsString()
  temasEspecificos: string;

  @IsNotEmpty()
  @IsString()
  local: string;

  @IsNotEmpty()
  @IsDate()
  dataProva: Date;
}
