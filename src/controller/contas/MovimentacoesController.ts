import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Contas } from "../../entity/Contas";
import { Usuarios } from "../../entity/Usuarios";
import { Movimentacoes } from "../../entity/Movimentacoes";
import MovimentacoesBusiness from "../../business/contas/MovimentacoesBusiness";

export interface IBuscaMovimentacoes {
    idUsuario: number,
    busca: string,
    tipoBusca: string
    pagina: number


}

@Controller('movimentacoes')
@ClassMiddleware([decodificar])
export default class EntradasSaidasController {

    @Get()
    async index(request: Request, response: Response): Promise<Response> {

        const movmentacoesBusiness = new MovimentacoesBusiness()
        const busca: IBuscaMovimentacoes = {
            idUsuario: Number(request.body.decoded.id),
            busca: String(request.body.busca),
            tipoBusca: String(request.body.tipoBusca),
            pagina: Number(request.body.pagina)
        }

        const retorno = await movmentacoesBusiness
            .buscarMovimentacoesFiltro(busca)

        return response.status(200).json(retorno)


    }
    @Get("busca-user")
    async buscamovimentaoesUder(request: Request, response: Response): Promise<Response> {
        const movmentacoesBusiness = new MovimentacoesBusiness()
        const idUsuarios: number = Number(request.body.decoded.id)
        const retorno = await movmentacoesBusiness.buscarMovimentacoesUser(idUsuarios, "1")

        return response.status(200).json(retorno)

    }

    @Post()
    async registerMovimentacaoConta(request: Request, response: Response): Promise<Response> {
        
        try{
        const movmentacoesBusiness = new MovimentacoesBusiness()
        const conta = new Contas()
        const usuario = new Usuarios()
        const movimentacoes = new Movimentacoes()
        movimentacoes.nomeMovimentacoes = String(request.body.nomeMovimentacoes)
        movimentacoes.valorMovimento = Number(request.body.valorMovimento)
        movimentacoes.descricao = String(request.body.descricao)
        movimentacoes.tipoEntrada = Boolean(request.body.tipoEntrada)
        movimentacoes.tipoPoupanca = Boolean(request.body.	tipoPoupanca)
        movimentacoes.dataMovimento = new Date
        usuario.id = Number(request.body.decoded.id)
        conta.id = Number(request.body.contaId)
        conta.usuariosIdFK = usuario
        movimentacoes.contasIdFK = conta

        const retorno = await movmentacoesBusiness.registerMovimentacaoConta(movimentacoes)

        return response.status(200).json(retorno) 
    }catch(e){
        return response.status(400).json(e) 
    }

    }

    @Post('estorno')
    async estornoConta(request: Request, response: Response): Promise<Response> {
        const movmentacoesBusiness = new MovimentacoesBusiness()
        const conta = new Contas()
        const usuario = new Usuarios()
        const movimentacoes = new Movimentacoes()

        const id = Number(request.body.id)
        const retorno = await movmentacoesBusiness.estornoConta(id)
        return response.status(200).json(retorno)

    }

    @Delete()
    async deleteMovimentacao(request: Request, response: Response): Promise<Response> {
        return response.status(200).json({})
     }

    @Put()
    async updateMovimentacao(request: Request, response: Response): Promise<Response> {

        return response.status(200).json()
     }


}
