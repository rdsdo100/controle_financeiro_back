import { getCustomRepository } from "typeorm";
import AppError from "../../config/errors/AppError";
import AuthJwt from "../../config/AuthJwt";
import { Usuarios } from "../../entity/Usuarios";

import UsuarioRepository from "../../repository/UsuarioRepository";

interface IRequestUsuareios{
    email: string
    senha: string
    
}

interface IResponse {
    authorization: string;
    usuario?: Usuarios;
}
    

export default class LoginUsuariosServices {
    private usuariosRepository: UsuarioRepository;

    constructor() {
        this.usuariosRepository = getCustomRepository(UsuarioRepository);
    }

    async execute({email , senha}: IRequestUsuareios): Promise<IResponse> {
        const authJwt = new AuthJwt();
        const usuario = await this.usuariosRepository.findByEmail(email);
        
    


        if (!usuario) {
            throw new AppError('Usuario ou senhas incorretas!', 400);
        }
         if (usuario.senha !== senha) {
             throw new AppError('Usuario ou senhas incorretas 44 !', 400);
         }
         
         const authorization = await authJwt.assinar(usuario);

        return {
            authorization,
        };
    }
}