import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Contas } from "../../entity/Contas";
import { EntradasSaidas } from "../../entity/EntradasSaidas";
import { Usuarios } from "../../entity/Usuarios";
import EntradasSaidasBusiness from "../../business/contas/EntradasSaidasBusiness";


@Controller('entradas-saidas')
@ClassMiddleware([decodificar])
export default class EntradasSaidasController {


    readonly conta = new Contas
    readonly entradasSaidas = new EntradasSaidas
    readonly usuario = new Usuarios
    readonly entradasSaidasBusiness = new EntradasSaidasBusiness

    @Get()
    async index(request: Request, response: Response) {

        const retorno =  await this.entradasSaidasBusiness.index()
return response.status(200).json(retorno)

    }

    @Post()
    async movimentacaoConta(request: Request, response: Response) {


        this.entradasSaidas.nomeEntradasSaidas = String(request.body.nomeEntradasSaidas)
        this.entradasSaidas.valorMovimento = Number(request.body.valorMovimento)
        this.entradasSaidas.descricao = String(request.body.descricao)
        this.usuario.id = Number(request.body.decoded.id)
        this.conta.id = Number(request.body.contaId)
        this.conta.usuariosIdFK = this.usuario
        this.entradasSaidas.contasIdFK = this.conta

        const retorno = await this.entradasSaidasBusiness.moviementacaoConta(this.entradasSaidas)

        return response.status(200).json(retorno)


    }


    @Post('estorno')
    async estornoConta(request: Request, response: Response) {

    }


}