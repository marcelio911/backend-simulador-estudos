import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EstatisticaService } from './estatistica.service';
import { Estatistica } from './model/estatistica.schema';

@Controller('estatisticas')
export class EstatisticaController {
  constructor(private readonly estatisticaService: EstatisticaService) {}

  @Post()
  create(@Body() createEstatisticaDto: any): Promise<Estatistica> {
    return this.estatisticaService.create(createEstatisticaDto);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Estatistica[]> {
    return this.estatisticaService.findByUserId(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Estatistica> {
    return this.estatisticaService.findById(id);
  }

  @Delete()
  deleteAll(): Promise<void> {
    return this.estatisticaService.deleteAll();
  }
}