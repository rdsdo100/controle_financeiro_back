import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import {getCustomRepository } from 'typeorm';
import Usuarios  from '@shared/database/entity/Usuarios';

import UsuariosRepository from '../typeorm/repositories/UsersRepository';


interface IRequest {
    name: string;
    email: string;
    password : string;
}

class CreateUserService {
    public async excute({ name, email, password }: IRequest): Promise<Usuarios> {
        const userRepository = getCustomRepository(UsuariosRepository);
        const emailExisit = await userRepository.findByEmail(email);

        if (emailExisit) {
            throw new AppError('Email já  existe!', 400);
        }

        const hashedPassword = await hash(password, 8);

        const usuarios  = userRepository.create({ name, email, password: hashedPassword });

        await userRepository.save(usuarios);

        return usuarios;
    }
}
export default CreateUserService