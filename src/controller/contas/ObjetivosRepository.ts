import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Objetivos } from "../../entity/Objetivos";
import { Contas } from "../../entity/Contas";
import ObjetivosBusiness from "../../business/contas/ObjetivosBusiness";



@Controller('objetivo')
@ClassMiddleware([decodificar])
export default class ObjetivosRepository {

readonly objetivosBusiness = new ObjetivosBusiness

    @Get()
    async inedx(request: Request, response: Response) { 
        const retorno = await this.objetivosBusiness.inedx()

        return response.status(200).json(retorno)

    }

    @Post()
    async cadastroObjetivos(request: Request, response: Response) {

        const objetivos = new Objetivos()
        const conta = new Contas()
        objetivos.nomeObjetivos = String(request.body.nomeObjetivos)
        objetivos.valorObjetivos = Number(request.body.valorObjetivos)
        objetivos.pontos = Number(request.body.pontos)
        objetivos.dataPrevistaObjetivos = new Date(String(request.body.data))
        conta.id = Number(request.body.contaIdi)
        objetivos.contasIdFK = conta

        const retorno = await this.objetivosBusiness.cadastroObjetivos(objetivos)

        return response.status(200).json(retorno)


    }

}