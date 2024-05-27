import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { EstatisticaService } from './estatistica.service';
import { Estatistica } from './model/estatistica.schema';
import { EstatisticaDto } from './model/estatistica.dto';

@Controller('estatisticas')
export class EstatisticaController {
  constructor(private readonly estatisticaService: EstatisticaService) {}

  @Put(':id')
  create(
    @Param('id') id: string,
    @Body() createEstatisticaDto: EstatisticaDto,
  ): Promise<Estatistica> {
    return this.estatisticaService.update(id, createEstatisticaDto);
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
