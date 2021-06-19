import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import  authConfig from "@config/auth"

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string
}

export default class CreateSessionsServices {
    
  public async excute({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UsersRepository);
        
        const user = await userRepository.findOne({
          where: {
            email : email
          }
        });

        if (!user) {
            throw new AppError('Email incorreto/ senha!', 401);
        }

        const passwordConfired = await compare(password, user?.password);

        if (!passwordConfired) {
          throw new AppError('Senha incorreto/ senha!', 401);
      }


      ////// Criação do token ////////

const token = sign( {} , authConfig.jwt.secret , {
subject: user.id,
expiresIn: authConfig.jwt.expiredIn


} )


    ////// Criação do token ////////

        return {user ,
        token
        };
    }
}
