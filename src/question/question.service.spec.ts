import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionsRepository } from './repository/question.repository';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, QuestionsRepository],
    })
      .overrideProvider(QuestionsRepository)
      .useValue({})
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
