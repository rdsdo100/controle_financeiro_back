import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
    token: string;
    password: string
    
}

class ResetPasswordService {
    public async excute({ token , password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const userToken = await userTokensRepository.findByToken(token);
        if (!userToken) {
            throw new AppError('User Token does not exists', 400);
        }
         const user = await userRepository.findById(userToken.user_id);
         if (!user) {
             throw new AppError('User does not exists', 400);
         }
         const  tokenCratedAt = userToken.created_at
         const  compareDate = addHours(tokenCratedAt , 2)
         
         if(isAfter(Date.now() , compareDate)){
           throw new AppError("Token invalido , Expirado." , 400)
         }
         user.password = await hash( password , 8)

         await userRepository.save(user)

    }
}
export default ResetPasswordService;
