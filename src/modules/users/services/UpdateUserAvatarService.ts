import upload from '@config/uploadConfig';
import AppError from '@shared/errors/AppError';
import fs from 'fs';
import path from 'path/posix';

import {getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';


interface IRequest {
    user_id: string;
    avatarFileName: string;
   
}

class UpdateUserAvatarService { // atualizar arquivos de avatar imagem no banco
    public async excute({ user_id ,avatarFileName }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);

        if(!user){
         throw new AppError('Usuario não encontrado!', 400 ) 
        }

        if(user.avatar){
          const userAvaratFilePath = path.join(upload.directory , user.avatar) //junta no nome de atquivo como o linc do diretorios de configorações
          const userAvaratFileExists= await fs.promises.stat(userAvaratFilePath) // fs varifica se existe esse arquivo
          if(userAvaratFileExists){
            await fs.promises.unlink(userAvaratFilePath); //  deleta o arquivo
          }
        }

     user.avatar = avatarFileName;

     await userRepository.save(user)

     return user
    }
}
export default UpdateUserAvatarService;