import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Contas } from "../../entity/Contas";
import { EntradasSaidas } from "../../entity/EntradasSaidas";


@Controller('entradas-saidas')
@ClassMiddleware([decodificar])
export default class EntradasSaidasController {


    readonly conta = new Contas
    readonly entradasSaidas = new EntradasSaidas

    @Get()
    async index(request: Request, response: Response) {


    }

    @Post('entrada')
    async entradasConta(request: Request, response: Response){
        console.log("ola")

    }

    @Post('saida')
    async saidasConta(request: Request, response: Response){

    }

    @Post('estorno')
    async estornoConta(request: Request, response: Response){

    }
}