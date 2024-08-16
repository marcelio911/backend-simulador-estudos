import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';
import { Simulacao } from './model/simulacao.schema';

@Controller('simulacoes')
export class SimulacaoController {
  constructor(private readonly simulacaoService: SimulacaoService) { }

  @Post()
  create(@Body() createSimulacaoDto: any): Promise<Simulacao> {
    console.log('createSimulacaoDto :: ', createSimulacaoDto);
    return this.simulacaoService.create(createSimulacaoDto);
  }

  @Put(':id')
  update(
    @Param('id') _id: string,
    @Body() createSimulacaoDto: any,
  ): Promise<Simulacao> {
    console.log('createSimulacaoDto :: ', createSimulacaoDto);
    return this.simulacaoService.update(_id, createSimulacaoDto);
  }

  @Get('concurso/:concursoId/user/:userId')
  @Get('concurso/:concursoId/user/:userId/filterOpenQuestions/:filterOpenQuestions')
  findByUserId(
    @Param('concursoId') concursoId: string,
    @Param('userId') userId: string,
    @Param('filterOpenQuestions') filterOpenQuestions: boolean,
  ): Promise<Simulacao[]> {
    return this.simulacaoService.findByConcursoUserId(concursoId, userId, filterOpenQuestions);
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
