
import AppError from '@config/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ILogin } from '../domain/models/ILogin';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';


class LoginUserServices {
  private usersRepository: IUsersRepository
  
  constructor() {
     this.usersRepository = getCustomRepository(UsersRepository)
  }

  public async execute( {email , password}: ILogin): Promise<IUser> {


const   login = await  this.usersRepository.findByEmail(email)

if(!login){
 throw new AppError("User or Password not Exists!")
}

    return login;
  }
}

export default LoginUserServices;
