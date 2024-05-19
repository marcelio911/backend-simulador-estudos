import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';
import { Simulacao } from './model/simulacao.schema';

@Controller('simulacoes')
export class SimulacaoController {
  constructor(private readonly simulacaoService: SimulacaoService) { }

  @Post()
  create(@Body() createSimulacaoDto: any): Promise<Simulacao> {
    return this.simulacaoService.create(createSimulacaoDto);
  }

  @Get('concurso/:concursoId/user/:userId')
  findByUserId(
    @Param('concursoId') concursoId: string,
    @Param('userId') userId: string,
  ): Promise<Simulacao[]> {
    return this.simulacaoService.findByConcursoUserId(concursoId, userId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Simulacao> {
    return this.simulacaoService.findById(id);
  }

  @Delete()
  deleteAll(): Promise<void> {
    return this.simulacaoService.deleteAll();
  }
}
