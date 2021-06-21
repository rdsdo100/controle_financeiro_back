import { Controller, ClassMiddleware, Get } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from "express";
import BancosBusiness from "../../../services/contas/BoancosBusiness";


@Controller('banco')
@ClassMiddleware([decodificar])
export default class BancosController {

    @Get()
    async index(_: Request, response: Response) : Promise<Response> {
        const bancosBusuness = new BancosBusiness()
        const retorno = await bancosBusuness.index()
        return response.status(200).json(retorno)
    }

}