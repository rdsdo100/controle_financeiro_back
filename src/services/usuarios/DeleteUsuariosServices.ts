import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';

interface IResquest {
    idUser: number;
    IdAdm?: number;
}

import UsuarioRepository from '../../repository/UsuarioRepository';

export default class DeleteUsuariosServices {
    private usuariosRepository: UsuarioRepository;

    constructor() {
        this.usuariosRepository = getCustomRepository(UsuarioRepository);
    }

    async execute({ idUser, IdAdm }: IResquest): Promise<void> {
        const usuario = await this.usuariosRepository.findById(idUser);

        if (IdAdm) {
            const usuariosAdm = await this.usuariosRepository.findById(IdAdm);
        }

        // usuario pode deletar  seu proprio usuario exeto o adm 
        // adm pode desetar qualquer usuario 
        // adm não pode deletar seu prodrio usuario mas outro adm pode deletar um adm

        if (!usuario) {
            throw new AppError('Usuário não existe!', 400);
        }
        await this.usuariosRepository.remove(usuario);
    }
}
