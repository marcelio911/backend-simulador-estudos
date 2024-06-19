import { Test, TestingModule } from '@nestjs/testing';
import { EstatisticaController } from './estatistica.controller';
import { EstatisticaRepository } from './repository/estatistica.repository';

describe('EstatisticaController', () => {
  let controller: EstatisticaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatisticaController, EstatisticaRepository],
    }).compile();

    controller = module.get<EstatisticaController>(EstatisticaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
