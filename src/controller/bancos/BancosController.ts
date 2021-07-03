import { Request, Response } from 'express';
import BancosServices from '../../services/bancos/BoancosServices';

export default class BancosController {
    async index(request: Request, response: Response): Promise<Response> {
       
       const  bancos = new BancosServices()
       const bancosRetorno = await bancos.index()
        return response.status(200).json(bancosRetorno);
    }
}
