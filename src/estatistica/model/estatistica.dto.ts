export interface EstatisticaDto {
  userId: string;
  concursoId: string;
  questionStats: Map<string, { attempts: number; correct: number }>;
  lastSimulacaoId: string;
}
