import AppError from '@config/errors/AppError';
import { ILogin } from '../domain/models/ILogin';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

class LoginUserServices {

private usersRepository: IUsersRepository

constructor(){
  this.usersRepository = new UsersRepository()
}

    public async execute({ email, password }: ILogin) {
        
        let login = await this.usersRepository.findByEmail(email);

        if (!login) {
            throw new AppError('User or Password not Exists!');
        }
        if (login.password !== password) {
            throw new AppError('User or Password not Exists!');
        }

        return login;
    }
}

export default LoginUserServices;
