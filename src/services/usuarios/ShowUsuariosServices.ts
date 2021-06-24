import { getCustomRepository } from "typeorm";
import AppError from "../../config/errors/AppError";
import { Usuarios } from "../../entity/Usuarios";

import UsuarioRepository from "../../repository/UsuarioRepository";

    

export default class ShowUsuariosServices {
    private usuariosRepository: UsuarioRepository;

    constructor() {
        this.usuariosRepository = getCustomRepository(UsuarioRepository);
    }

    async execute(id: number): Promise<Usuarios> {
        const usuario = await this.usuariosRepository.findById(id);
       
        if(!usuario){
            throw new AppError("Usuário não existe!" , 400)
        }

        return usuario;
    }
}