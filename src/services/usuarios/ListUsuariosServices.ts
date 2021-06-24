import { getCustomRepository } from "typeorm";
import AppError from "../../config/errors/AppError";
import { Usuarios } from "../../entity/Usuarios";

import UsuarioRepository from "../../repository/UsuarioRepository";



export default class ListUsuariosServices {
    private usuariosRepository: UsuarioRepository;

    constructor() {
        this.usuariosRepository = getCustomRepository(UsuarioRepository);
    }

    async execute(id: number): Promise<Usuarios[]> {
        const usuarios = await this.usuariosRepository.find();
        return usuarios;
    }
}