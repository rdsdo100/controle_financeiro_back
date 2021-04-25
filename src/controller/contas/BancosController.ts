import { Controller, ClassMiddleware, Get } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from "express";
import BancosBusiness from "../../business/contas/BoancosBusiness";




@Controller('banco')
@ClassMiddleware([decodificar])
export default class BancosController {

    readonly bancosBusuness = new BancosBusiness()


    @Get()
    async index(_: Request, response: Response) {

        const retorno = await this.bancosBusuness.index()
        return response.status(200).json(retorno)
    }



}