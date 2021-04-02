import {Request, Response} from "express";
import { Controller, Get } from '@overnightjs/core';
import {Usuarios} from "../../entity/Usuarios";
import LoginBusiness from "../../business/usuarios/LoginBusiness";

@Controller('login')
export default class LoginController{


    @Get()
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