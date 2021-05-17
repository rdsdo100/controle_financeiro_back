import {Usuarios} from "../../entity/Usuarios";
import {assinar} from "../../config/Jwt";
import UsuarioRepository from "../../repository/UsuarioRepository";

export  default class LoginBusiness {

    readonly usuarioRepository = new UsuarioRepository

    async login(usuario: Usuarios) {

        try {

        let getUsuario: Usuarios

        getUsuario = await this.usuarioRepository.buscarUsuarioRepository(usuario)


            if ((!getUsuario.nomeUsuario) || (getUsuario.senha != usuario.senha)) {
                              
                return ({message: "Usuario  ou senha incorreto!"})

            }else {

                const authorization = await assinar(getUsuario)

                return {
                    id: getUsuario.id,
                    nomeUsuario: getUsuario.nomeUsuario,
                    authorization
                }
            }

        } catch (error) {

           return error

        }
    }

}