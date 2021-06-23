import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { Usuarios } from "../../entity/Usuarios";
import { Request, Response } from 'express'
import UsuariosBusiness from "../../services/usuarios/UsuariosBusiness";
import { decodificar } from "../../config/Jwt";


@Controller('user')
@ClassMiddleware([decodificar])
export default class UsuaruiosController {

    @Get()
    async listUsuarios(request: Request, response: Response) {
        const auth = request.body.decoded
        const usuariosBusiness = new UsuariosBusiness()
        const retorno = await usuariosBusiness.buscarUsuariosall(Number(auth.grupoUsuario))


        response.json(retorno)

    }


    @Post()
    async cadastroUsuarios(request: Request, response: Response) {

        const usuarios = new Usuarios()
     
        const usuariosBusiness = new UsuariosBusiness()
     

        usuarios.nomeUsuario = String(request.body.nome)
        usuarios.email = String(request.body.email)
        usuarios.senha = String(request.body.senha)
      

        const retornoUsuario = await usuariosBusiness.cadastroUsuariosBuisiness(usuarios)

        return response.status(200).json(retornoUsuario)

    }

    @Put()
    async updateUsuarios (request: Request, response: Response){


        const usuarios = new Usuarios()
    
        const usuariosBusiness = new UsuariosBusiness()

        usuarios.id =  Number(request.body.id)
        usuarios.nomeUsuario = String(request.body.nome)
        usuarios.email = String(request.body.email)
        usuarios.senha = String(request.body.senha)
       
        const resposta = await usuariosBusiness.updateUsuario(usuarios)
        response.json(resposta)
    }

    @Delete(':id')
    async deletarUsuario(request: Request, response: Response) {
        const deletar = Number(request.params.id)
        const usuarioDecoded = Number(request.params.id)
        const usuariosBusiness = new UsuariosBusiness()

        const resposta = await usuariosBusiness.deletarUsuario(deletar, usuarioDecoded)
        response.json(resposta)

    }

}