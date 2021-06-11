import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Contas } from "../../entity/Contas";
import ObjetivosBusiness from "../../business/contas/ObjetivosBusiness";
import { ObjetivosFinaceiros } from "../../entity/ObjetivosFinaceiros";

@Controller('objetivo')
@ClassMiddleware([decodificar])
export default class ObjetivosController {

    readonly objetivosBusiness = new ObjetivosBusiness

    @Get()
    async buscarObjetivosAll(request: Request, response: Response): Promise<Response> {

        const idUsuario: number = Number(request.body.decoded.id)


        return response.status(200).json({ok: "resposta"})
    }
    @Get(":id")
    async buscarObjetivosId(request: Request, response: Response): Promise<Response> { 
        const idObjetivos : number = Number(request.params.id)
        const idUsuario: number = Number(request.body.decoded.id)
        return response.status(200).json({})
    }

    @Get('contas')
    async buscarAllObjetivosContasId(request: Request, response: Response): Promise<Response> { 
        return response.status(200).json({})
    }

    @Post()
    async cadastroObjetivos(request: Request, response: Response): Promise<Response> {

        

        const objetivosFinaceiros = new ObjetivosFinaceiros()
        const conta = new Contas()
        objetivosFinaceiros.nomeObjetivos = String(request.body.nomeObjetivos)
        objetivosFinaceiros.valorObjetivos = Number(request.body.valorObjetivos)
        objetivosFinaceiros.valorGuardado = Number(request.body.valorGuardado)
        objetivosFinaceiros.descricao = String(request.body.descricao)
        objetivosFinaceiros.dataPrevistaObjetivos = new Date(String(request.body.dataPrevistaObjetivos))
        conta.id = Number(request.body.contaId)
        objetivosFinaceiros.contasIdFK = conta


        
        return response.status(200).json({})

    }

    @Post('concluir')
    async concluirObjetivos(request: Request, response: Response): Promise<Response> { 

        return response.status(200).json({})  
    }

    @Put()
    async updateObjetivosAll(request: Request, response: Response): Promise<Response> {

        const objetivosFinaceiros = new ObjetivosFinaceiros()
        const conta = new Contas()
        const idUsuario: number = Number(request.body.decoded.id)
        objetivosFinaceiros.id = Number(request.body.idObjetivos)
        objetivosFinaceiros.nomeObjetivos = String(request.body.nomeObjetivos)
        objetivosFinaceiros.valorObjetivos = Number(request.body.valorObjetivos)
        objetivosFinaceiros.valorGuardado = Number(request.body.valorGuardado)
        objetivosFinaceiros.descricao = String(request.body.descricao)
        objetivosFinaceiros.dataPrevistaObjetivos = new Date(String(request.body.dataPrevistaObjetivos))
        conta.id = Number(request.body.contaId)
        objetivosFinaceiros.contasIdFK = conta

        return response.status(200).json({})

     }

    @Delete(":id")
    async deleteObjetivos(request: Request, response: Response): Promise<Response> { 
        const idDelete : number = Number(request.params.id)
        const idUsuario: number = Number(request.body.decoded.id)

        return response.status(200).json({})
    }


}