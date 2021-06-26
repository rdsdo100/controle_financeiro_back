import path from 'path';
import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import EtherealMail from '../../config/mail/EtherealMail';
import UsuarioRepository from '../../repository/UsuarioRepository';

    
class SendForgotPasswordEmailService {
    private usuariosRepository: UsuarioRepository;

    constructor() {
        this.usuariosRepository = getCustomRepository(UsuarioRepository);
    }

    public async excute(email: string): Promise<void> {
        const forgotPasswordTemplateEmail = path.resolve(__dirname, './' ,'..', '..', 'views','Emails', 'forgot_password.hbs');
       

const usuario = await this.usuariosRepository.findOne({
    where: {
        id: 1
    }
})



if (!usuario) {
    throw new AppError(`Email: ${email} não existe.`);
}

        await EtherealMail.sendMail({
            to: { name: usuario.nomeUsuario, email: email },
            subject: 'Api Vendas',

            tampleteData: {
                file: forgotPasswordTemplateEmail,
                variables: {
                    name: usuario.nomeUsuario,
                    link: `https://www.youtube.com/watch?v=bqICGrdLGIc&list=RDbqICGrdLGIc&start_radio=1&ab_channel=TV80s`,
                },
            },
        });
    }
}
export default SendForgotPasswordEmailService;
