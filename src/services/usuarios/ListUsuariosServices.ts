import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { Usuarios } from '../../entity/Usuarios';

import UsuarioRepository from '../../repository/UsuarioRepository';

export default class ListUsuariosServices {
    private usuariosRepository: UsuarioRepository;

    constructor() {
        this.usuariosRepository = getCustomRepository(UsuarioRepository);
    }

    async execute(id: number): Promise<Usuarios[]> {
        const usuariosAdm = await this.usuariosRepository.findById(id);

        if (usuariosAdm?.administrador === false) {
            throw new AppError('Não a  permissão de acesso!', 401);
        }
        const usuarios = await this.usuariosRepository.find();

        if (!usuarios) {
            throw new AppError('Sema usuarios para listar', 400);
        }
        return usuarios;
    }
}
