
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';


class CreateUserService {
  private usersRepository: IUsersRepository

constructor(){
  this.usersRepository = new UsersRepository()
}

  public async execute(data: ICreateUser): Promise<IUser> {
    
    const user = await this.usersRepository.create(data) 
    return user;
  }
}

export default CreateUserService;
