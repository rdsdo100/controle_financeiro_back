import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Contas } from "../../entity/Contas";
import { Usuarios } from "../../entity/Usuarios";
import { Movimentacoes } from "../../entity/Movimentacoes";
import MovimentacoesBusiness from "../../business/contas/MovimentacoesBusiness";


@Controller('movimentacoes')
@ClassMiddleware([decodificar])
export default class EntradasSaidasController {

    readonly movmentacoesBusiness = new MovimentacoesBusiness

    @Get()
    async index(request: Request, response: Response) {

        const retorno = await this.movmentacoesBusiness.index()
        return response.status(200).json(retorno)

    }

    @Post()
    async movimentacaoConta(request: Request, response: Response) {

        const conta = new Contas()
        const usuario = new Usuarios()
        const movimentacoes = new Movimentacoes()
        movimentacoes.nomeMovimentacoes = String(request.body.nomeMovimento)
        movimentacoes.valorMovimento = Number(request.body.valorMovimento)
        movimentacoes.descricao = String(request.body.descricao)
        movimentacoes.tipoEntrada = Boolean(request.body.tipoEntrada)
        movimentacoes.dataMovimento = new Date
        usuario.id = Number(request.body.decoded.id)
        conta.id = Number(request.body.contaId)
        conta.usuariosIdFK = usuario
        movimentacoes.contasIdFK = conta

        const retorno = await this.movmentacoesBusiness.moviementacaoConta(movimentacoes)

        return response.status(200).json(retorno)


    }


    @Post('estorno')
    async estornoConta(request: Request, response: Response) {

        const conta = new Contas()
        const usuario = new Usuarios()
        const movimentacoes = new Movimentacoes()

        const id = Number(request.body.id)
                const retorno = await this.movmentacoesBusiness.estornoConta(id)
        return response.status(200).json(retorno)

    }

    @Delete()
    async deleteMovimentacao(request: Request, response: Response){}

    @Put()
    async updateMovimentacao(request: Request, response: Response){}


}