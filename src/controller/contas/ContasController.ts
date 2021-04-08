import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import ContasBusiness from "../../business/contas/ContasBusiness";
import { decodificar } from "../../config/Jwt";
import { Contas } from "../../entity/Contas";
import { Request, Response } from "express";
import { Usuarios } from "../../entity/Usuarios";

@Controller('conta')
@ClassMiddleware([decodificar])
export default class ContasController {

    
    readonly contasBusiness = new ContasBusiness


    @Get()
    async index(request: Request, response: Response) {
        const retorno = await this.contasBusiness.index()
        return response.status(200).json(retorno)

    }

    @Post()
    async cadastrarContas(request: Request, response: Response) {


        const contas = new Contas
        const usuarios = new Usuarios

        contas.nomeConta = String(request.body.nomeConta)
        contas.qtdPontos = Number(request.body.qtdPontos)
        contas.valorConta = Number(request.body.valorConta)
        usuarios.id = Number(request.body.decoded.id)
        contas.usuariosIdFK = usuarios
        const retorno = await this.contasBusiness.cadastrarContas(contas)
        return response.status(200).json(retorno)

    }
}