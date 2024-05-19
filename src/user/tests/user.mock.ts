// user.mock.ts

import { UserContractRepository } from './user.contract';

export class UserMockRepository implements UserContractRepository {
  private users: any[] = [];

  async createUser(user: any): Promise<any> {
    this.users.push(user);
    return user;
  }
}
