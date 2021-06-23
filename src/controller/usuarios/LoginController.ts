import {Request, Response} from "express";
import {Usuarios} from "../../entity/Usuarios";
import LoginBusiness from "../../services/usuarios/LoginServices";


export default class LoginController{



    async login(request: Request , response: Response) {

        try {

            const usuario = new Usuarios()
            const loginBusiness = new LoginBusiness()

            usuario.nomeUsuario = String(request.headers.user)
            usuario.senha = String(request.headers.password)
            const retorno = await loginBusiness.login(usuario)

            return response.json(retorno)

        } catch (error) {

           return  response.json(error)

        }
    }
}