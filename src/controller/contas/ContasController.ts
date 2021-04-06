import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import ContasBusiness from "../../business/contas/ContasBusiness";
import { decodificar } from "../../config/Jwt";
import { Contas } from "../../entity/Contas";
import { Request, Response } from "express";
import { Usuarios } from "../../entity/Usuarios";

@Controller('conta')
@ClassMiddleware([decodificar])
export default class ContasController {

    readonly contas = new Contas
    readonly usuarios = new Usuarios
    readonly contasBusiness = new ContasBusiness


    @Get()
    async index(request: Request, response: Response) {
        const retorno = await this.contasBusiness.index()
        return response.status(200).json(retorno)

    }

    @Post()
    async cadastrarContas(request: Request, response: Response) {

        this.contas.nomeConta = String(request.body.nomeConta)
        this.contas.qtdPontos = Number(request.body.qtdPontos)
        this.contas.valorConta = Number(request.body.valorConta)
        this.usuarios.id = Number(request.body.decoded.id)
        this.contas.usuariosIdFK = this.usuarios
        const retorno = await this.contasBusiness.cadastrarContas(this.contas)
        return response.status(200).json(retorno)

    }
}