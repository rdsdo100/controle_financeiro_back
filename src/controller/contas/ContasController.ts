import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import ContasBusiness from "../../business/contas/ContasBusiness";
import { decodificar } from "../../config/Jwt";
import { Contas } from "../../entity/Contas";
import { Request, Response } from "express";
import { Usuarios } from "../../entity/Usuarios";
import Bancos from "../../entity/Bancos";


@Controller('conta')
@ClassMiddleware([decodificar])
export default class ContasController {

    readonly contasBusiness = new ContasBusiness

    @Get()
    async index(request: Request, response: Response) {
        const idUsuarios: number = Number(request.body.decoded.id)

        const retorno = await this.contasBusiness.index(idUsuarios)
        return response.status(200).json(retorno)

    }

    @Post()
    async cadastrarContas(request: Request, response: Response) {
        const idUsuarios: number = Number(request.body.decoded.id)
        const contas = new Contas()
        const usuarios = new Usuarios()
        const banco = new Bancos()

        contas.nomeConta = String(request.body.nomeConta)
        contas.valorLivre = Number(request.body.valorLivre)
        contas.valorSeparado = Number(request.body.valorSeparado)
        usuarios.id = idUsuarios
        banco.id = Number(request.body.bancosIdFK.id)
        contas.usuariosIdFK = usuarios
        contas.bancosIdFK = banco

        const retorno = await this.contasBusiness.cadastrarContas(contas)
        return response.status(200).json(retorno)

    }

    @Delete('/:id')
    async deleteMovimentacao(request: Request, response: Response) {
        const idUsuarios: number = Number(request.body.decoded.id)
        const idConta: number = Number(request.params.id)

        return this.contasBusiness.deleteConta(idConta)

    }

    @Put()
    async updateMovimentacao(request: Request, response: Response) {
        const idUsuarios: number = Number(request.body.decoded.id)
        const contas = new Contas()
        const usuarios = new Usuarios()


        contas.id = Number(request.body.id)
        contas.nomeConta = String(request.body.nomeConta)
        contas.valorLivre = Number(request.body.valorLivre)
        contas.valorSeparado = Number(request.body.valorSeparado)
        usuarios.id = idUsuarios
        contas.usuariosIdFK = usuarios

       

        
         const retorno = await this.contasBusiness.updateConta(contas)
       return response.status(200).json(retorno)

    }
}