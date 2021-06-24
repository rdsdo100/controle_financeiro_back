import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { Usuarios } from '../../entity/Usuarios';
import UsuarioRepository from '../../repository/UsuarioRepository';

export default class CreateUsuariosServices {
    private usuariosRepository: UsuarioRepository;

    constructor() {
        this.usuariosRepository = getCustomRepository(UsuarioRepository);
    }

    async execute(usuario: Usuarios): Promise<Usuarios> {
        const usuarioEmailExist = await this.usuariosRepository.findByEmail(usuario.email);

        if (usuarioEmailExist) {
            throw new AppError('Email já existe!', 400);
        }
        usuario = await this.usuariosRepository.save(usuario);

        return usuario;
    }
}
