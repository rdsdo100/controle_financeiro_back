
import { getCustomRepository } from 'typeorm';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';


class CreateUserService {
  private usersRepository: UsersRepository
  
  constructor() {
     this.usersRepository = getCustomRepository(UsersRepository)
  }

  public async execute(data: ICreateUser): Promise<IUser> {
    
    const user = await this.usersRepository.create(data) 
    return user;
  }
}

export default CreateUserService;
