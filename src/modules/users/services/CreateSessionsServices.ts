import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm';
import  authConfig from "@config/auth"
import Usuarios from '@shared/database/entity/Usuarios';
import UsuarioRepository from '@shared/database/repository/UsuarioRepository';


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user?: Usuarios;
    token: string
}

export default class CreateSessionsServices {
    
  public async excute({ email, password }: IRequest): Promise<IResponse> {
        const usuariosRepository = getCustomRepository(UsuarioRepository);
        
        const user = await usuariosRepository.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new AppError('Email incorreto/ senha!', 401);
        }

        const passwordConfired = await compare(password, user?.senha);

        if (!passwordConfired) {
          throw new AppError('Senha incorreto/ senha!', 401);
      }


      ////// Criação do token ////////
/*
const token =  sign( {} , authConfig.jwt.secret , {
subject: user?.id,
expiresIn: authConfig.jwt.expiredIn
*/

const token = jwt.sign(
            { id: user.id, nomeUsuario: user.nomeUsuario },
            String(process.env.JWT_TOKEN),
            { expiresIn: '1d' })




    ////// Criação do token ////////

        return {
        token
        };
    }
}
