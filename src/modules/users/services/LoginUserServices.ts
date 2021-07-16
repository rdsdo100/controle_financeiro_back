import AuthJwt from '@config/AuthJwt';
import AppError from '@config/errors/AppError';
import { ICreateToken } from '../domain/models/ICreateToken';
import { ILogin } from '../domain/models/ILogin';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

class LoginUserServices {

private usersRepository: IUsersRepository

constructor(){
  this.usersRepository = new UsersRepository()
}

    public async execute({ email, password }: ILogin) : Promise<ICreateToken> {
        const  auth = new  AuthJwt()
        let login = await this.usersRepository.findByEmail(email);

        if (!login) {
            throw new AppError('User or Password not Exists!' , 401);
        }
        if (login.password !== password) {
            throw new AppError('User or Password not Exists!' , 401);
        }

        const token = await auth.assinar(login)

        return {
            email: login.email,
            user: login.name,
            authorization: token 
        };
    }
}

export default LoginUserServices;
