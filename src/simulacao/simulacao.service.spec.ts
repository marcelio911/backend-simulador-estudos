import { Test, TestingModule } from '@nestjs/testing';
import { SimulacaoService } from './simulacao.service';

describe('SimulacaoService', () => {
  let service: SimulacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulacaoService],
    }).compile();

    service = module.get<SimulacaoService>(SimulacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
