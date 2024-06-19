import { Test, TestingModule } from '@nestjs/testing';
import { EstatisticaService } from './estatistica.service';
import { EstatisticaRepository } from './repository/estatistica.repository';

describe('EstatisticaService', () => {
  let service: EstatisticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstatisticaService, EstatisticaRepository],
    }).compile();

    service = module.get<EstatisticaService>(EstatisticaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
