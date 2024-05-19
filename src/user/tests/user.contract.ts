// user.contract.ts

export abstract class UserContractRepository {
  abstract createUser(user: any): Promise<any>;
}
