import { IAccounts } from "../domain/models/IAccounts";
import { ICreateAccounts } from "../domain/models/ICreateAccounts";
import { IAccountsRepository } from "../domain/repositories/IUsersRepository";
import AccountsRepository from "../infra/typeorm/repositories/AccountsRepository";


class CreateUserService {
  private accountsRepository: IAccountsRepository

constructor(){
  this.accountsRepository = new AccountsRepository()
}

  public async execute(data: ICreateAccounts): Promise<IAccounts> {

    const account  = await this.accountsRepository.create(data)
    
    return account
  }
}

export default CreateUserService;
