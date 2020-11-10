import {ClassMiddleware, Controller, Delete, Get, Post} from "@overnightjs/core";
import { getRepository } from "typeorm";
import { Usuarios } from "../entity/Usuarios";
import {Request , Response} from 'express'

import {decodificar} from "../config/Jwt";
import UsuarioBusiness from "../business/UsuarioBusiness";


@Controller('user')
//@ClassMiddleware([decodificar])
export default class UsuaruiosController {

  

    @Post()
    async cadastroUsuarios(request: Request , response: Response){

        const usuarios = new Usuarios()
        const usuariosBusiness = new UsuarioBusiness()


        try {

            usuarios.nomeUsuario = String(request.body.nome)
            usuarios.email = String(request.body.email)
            usuarios.senha = String(request.body.senha)
            usuarios.matricula = String(request.body.matricula)

            const resposta = await usuariosBusiness.cadastroUsuarios(usuarios)
            return   response.json( resposta )
        } catch (err) {
            return  response.json( {
                mesage : err.mesage ,
                err} )
        }

    }

    @Delete(':id')
    async deletarUsuario(request: Request , response: Response){
        const deletar = Number(request.params.id)


        const usuariosBusiness = new UsuarioBusiness()

        const resposta = await  usuariosBusiness.deletarUsuario(deletar)

        response.json( resposta )


    }



}