
import {Request, Response} from "express";


export default class Inicio {

    inicio (req: Request , res: Response) {
        res.send({ok : 'Online' , Name: 'Controle finaceiro'})
    }

}