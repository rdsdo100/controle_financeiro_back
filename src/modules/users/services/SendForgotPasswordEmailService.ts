import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from "@config/mail/EtherealMail"
import path from 'path';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async excute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists', 400);
        }
      
        const token = await userTokensRepository.generate(user.id);

      if (!token) {
          throw new AppError('token does not exists', 400);
      }
      

      const forgotPasswordTemplateEmail = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        await EtherealMail.sendMail({
            to: { name: user.name, email: email },
            subject: 'Api Vendas',

            tampleteData: {
                file: forgotPasswordTemplateEmail,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/password/reset?token=${token.token}`,
                },
            },
        });
    }
}
export default SendForgotPasswordEmailService;
