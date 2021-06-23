import { Request, Response } from 'express';
import BancosBusiness from '../services/bancos/BoancosServices';

export default class BancosController {
    async index(_: Request, response: Response): Promise<Response> {
        const bancosBusuness = new BancosBusiness();
        const retorno = await bancosBusuness.index();
        return response.status(200).json(retorno);
    }
}
