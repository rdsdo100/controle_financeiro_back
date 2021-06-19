import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import {getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';


interface IRequest {
    name: string;
    email: string;
    password : string;
}

class CreateUserService {
    public async excute({  name,email, password  }: IRequest): Promise<User> {
       
      const userRepository = getCustomRepository(UsersRepository);
        const emailExisit = await userRepository.findByEmail(email);
        
        if (emailExisit) {
            throw new AppError('Email já  existe!', 400);
        }
        
const  hashedPassword = await hash(password , 8);

        const user = userRepository.create({ name,email, password: hashedPassword  });

        await userRepository.save(user);

        return user;
    }
}
export default CreateUserService