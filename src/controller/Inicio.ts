
import { Controller, Get } from "@overnightjs/core";
import {Request, Response} from "express";

@Controller('/')
export default class Inicio {

    @Get()
    inicio (req: Request , res: Response) {
        res.send({ok : 'Funcionando' , Name: 'Rubens'})
    }

}