import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Contas } from "../../entity/Contas";
import { Usuarios } from "../../entity/Usuarios";
import { Movimentacoes } from "../../entity/Movimentacoes";
import MovimentacoesBusiness from "../../business/contas/MovimentacoesBusiness";


@Controller('movimentacoes')
@ClassMiddleware([decodificar])
export default class EntradasSaidasController {


    readonly conta = new Contas
    readonly movimentacoes = new Movimentacoes
    readonly usuario = new Usuarios
    readonly movmentacoesBusiness = new MovimentacoesBusiness
    

    @Get()
    async index(request: Request, response: Response) {

        const retorno =  await this.movmentacoesBusiness.index()
return response.status(200).json(retorno)

    }

    @Post()
    async movimentacaoConta(request: Request, response: Response) {


        this.movimentacoes.nomeMovimentacoes = String(request.body.nomeMovimento)
        this.movimentacoes.valorMovimento = Number(request.body.valorMovimento)
        this.movimentacoes.descricao = String(request.body.descricao)
        this.movimentacoes.tipoEntrada = Boolean(request.body.tipoEntrada)
        this.usuario.id = Number(request.body.decoded.id)
        this.conta.id = Number(request.body.contaId)
        this.conta.usuariosIdFK = this.usuario
        this.movimentacoes.contasIdFK = this.conta

        
        const retorno = await this.movmentacoesBusiness.moviementacaoConta(this.movimentacoes)

        return response.status(200).json(retorno)


    }


    @Post('estorno')
    async estornoConta(request: Request, response: Response) {

    }


}