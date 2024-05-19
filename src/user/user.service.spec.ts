import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserMockRepository } from './tests/user.mock';
import { UserContractRepository } from './tests/user.contract';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserContractRepository,
          useClass: UserMockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'John911',
      lastname: 'Santana',
    };
    const createdUser = await service.findOrCreate(user);
    expect(createdUser).toEqual(user);
  });
});
