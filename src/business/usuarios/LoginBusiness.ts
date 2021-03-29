import {Usuarios} from "../../entity/Usuarios";
import {assinar} from "../../config/Jwt";
import UsuarioRepository from "../../repository/UsuarioRepository";



export  default class LoginBusiness {

    readonly usuarioRepository = new UsuarioRepository

    async index(){

    }

    async login(usuario: Usuarios) {

        try {

        let getUsuario:any

        getUsuario = await this.usuarioRepository.buscarUsuarioRepository(usuario.nomeUsuario)

            if ((!getUsuario?.nomeUsuario) || (getUsuario?.senha != usuario.senha)) {
                return ({message: "Usuario  ou senha incorreto!"})

            }else {

                const authorization = await assinar(Number(getUsuario.id),
                    String(getUsuario.nomeUsuario)
                    
                )

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