import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Objetivos } from "../../entity/Objetivos";
import { Contas } from "../../entity/Contas";
import ObjetivosBusiness from "../../business/contas/ObjetivosBusiness";

@Controller('objetivo')
@ClassMiddleware([decodificar])
export default class ObjetivosController {

    readonly objetivosBusiness = new ObjetivosBusiness

    @Get()
    async inedx(request: Request, response: Response) {
        const retorno = await this.objetivosBusiness.inedx()

        return response.status(200).json(retorno)

    }

    @Get('all')
    async buscarObjetivosAll(request: Request, response: Response) {

        const idUsuario: number = Number(request.body.decoded.id)

        const retorno = await this.objetivosBusiness.buscarObjetivosAll(idUsuario)
        return response.status(200).json(retorno)

    }
    @Get(":id")
    async buscarObjetivosId(request: Request, response: Response) { 
        const idObjetivos : number = Number(request.params.id)
        const idUsuario: number = Number(request.body.decoded.id)

        const retorno = await this.objetivosBusiness.buscarObjetivosId(idObjetivos , idUsuario)
      return response.status(200).json(retorno)
    }

    @Get('contas')
    async buscarAllObjetivosContasId(request: Request, response: Response) { }

    @Post()
    async cadastroObjetivos(request: Request, response: Response) {

        const objetivos = new Objetivos()
        const conta = new Contas()
        objetivos.nomeObjetivos = String(request.body.nomeObjetivos)
        objetivos.valorObjetivos = Number(request.body.valorObjetivos)
        objetivos.pontos = Number(request.body.pontos)
        objetivos.descricao = String(request.body.descricao)
        objetivos.dataPrevistaObjetivos = new Date(String(request.body.dataPrevistaObjetivos))
        conta.id = Number(request.body.contaId)
        objetivos.contasIdFK = conta

        const retorno = await this.objetivosBusiness.cadastroObjetivos(objetivos)

        return response.status(200).json(retorno)

    }

    @Post('concluir')
    async concluirObjetivos(request: Request, response: Response) { }

    @Put()
    async updateObjetivosAll(request: Request, response: Response) {

        const objetivos = new Objetivos()
        const conta = new Contas()
        const idUsuario: number = Number(request.body.decoded.id)
        objetivos.nomeObjetivos = String(request.body.nomeObjetivos)
        objetivos.valorObjetivos = Number(request.body.valorObjetivos)
        objetivos.pontos = Number(request.body.pontos)
        objetivos.descricao = String(request.body.descricao)
        objetivos.dataPrevistaObjetivos = new Date(String(request.body.dataPrevistaObjetivos))
        conta.id = Number(request.body.contaId)
        objetivos.contasIdFK = conta

        const retorno = await this.objetivosBusiness.updateObjetivos(objetivos ,idUsuario)

        return response.status(200).json(retorno)

     }

    @Delete(":id")
    async deleteObjetivos(request: Request, response: Response) { 
        const idDelete : number = Number(request.params.id)
        const idUsuario: number = Number(request.body.decoded.id)

        const retorno: string = await this.objetivosBusiness.deleteObjetivos(idDelete , idUsuario)
      return response.status(200).json(retorno)
    }


}