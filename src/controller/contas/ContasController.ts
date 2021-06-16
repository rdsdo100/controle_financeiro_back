import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import ContasBusiness from "../../services/contas/ContasBusiness";
import { decodificar } from "../../config/Jwt";
import { Contas } from "../../entity/Contas";
import { Request, Response } from "express";
import { Usuarios } from "../../entity/Usuarios";
import Bancos from "../../entity/Bancos";


@Controller('conta')
@ClassMiddleware([decodificar])
export default class ContasController {


    /*
      private connectionsRepository: Repository<Connection>
    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }
    */
    readonly contasBusiness = new ContasBusiness

    @Get()
    async index(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id)

        const retorno = await this.contasBusiness.index(idUsuarios)
        return response.status(200).json(retorno)

    }

    @Post()
    async cadastrarContas(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id)
        const contas = new Contas()
        const usuarios = new Usuarios()
        const banco = new Bancos()

        contas.nomeConta = String(request.body.nomeConta)
        contas.corrente = Number(request.body.corrente)
        contas.poupanca = Number(request.body.poupanca)
        usuarios.id = idUsuarios
        banco.id = Number(request.body.bancosIdFK.id)
        contas.usuariosIdFK = usuarios
        contas.bancosIdFK = banco

        const retorno = await this.contasBusiness.cadastrarContas(contas)
        return response.status(200).json(retorno)

    }

    @Delete(':id')
    async deleteMovimentacao(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id)
        const idConta: number = Number(request.params.id)
        const retorno = await this.contasBusiness.deleteConta(idConta , idUsuarios)
        return response.status(200).json(retorno)

    }

    @Put()
    async updateMovimentacao(request: Request, response: Response): Promise<Response> {
        const idUsuarios: number = Number(request.body.decoded.id)
        const contas = new Contas()
        const usuarios = new Usuarios()


        contas.id = Number(request.body.id)
        contas.nomeConta = String(request.body.nomeConta)
        contas.corrente = Number(request.body.corrente)
        contas.poupanca = Number(request.body.poupanca)
        contas.ativo = Boolean(request.body.ativo)
        contas.bloqueado = Boolean(request.body.bloqueado)
        usuarios.id = idUsuarios
        contas.usuariosIdFK = usuarios

        const retorno = await this.contasBusiness.updateConta(contas)
        return response.status(200).json(retorno)

    }
}