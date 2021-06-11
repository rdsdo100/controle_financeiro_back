import { Controller, Get } from "@overnightjs/core";

import { Request, Response } from "express";





@Controller('flu')

export default class Dollar {



    @Get()
    async index(_: Request, response: Response): Promise<Response> {

       
        return response.status(200).json({dolar: 4.5 , euro: 5.5 })
    }



}