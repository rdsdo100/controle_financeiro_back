
import { getCustomRepository } from 'typeorm';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';


class ListUserService {
  private usersRepository: IUsersRepository
  
  constructor() {
     this.usersRepository = getCustomRepository(UsersRepository)
  }

  public async execute(): Promise<IUser[]> {
    const users = this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
