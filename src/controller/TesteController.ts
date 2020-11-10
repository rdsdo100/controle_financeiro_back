import {json, Request, Response} from "express";
import { Controller, Get } from '@overnightjs/core';

import {getManager} from "typeorm";

interface IEnderecos{
    estoque?: string,
    zona: string,
    rua: string,
    coluna: string,
    nivel: string
}


@Controller('test')
export default class TestController{

/*    @Get()
    async Test(request: Request , response: Response) {

        const user = await getManager()
            .createQueryBuilder(EstoqueEnderecos, "user")
            .where("user.id = :id", { id: 100  })

            .getOne();
        console.log(user)


        return response.json(user)*/



}