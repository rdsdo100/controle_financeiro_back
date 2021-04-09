import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { decodificar } from "../../config/Jwt";
import { Request, Response } from 'express'
import { Objetivos } from "../../entity/Objetivos";



@Controller('objetivo')
@ClassMiddleware([decodificar])
export default class ObjetivosRepository {

    @Get()
    async inedx(t: Request, response: Response){}

    @Post()
    async cadastroObjetivos (t: Request, response: Response){
        
        const objetivos = new Objetivos()

        
    }
    
}