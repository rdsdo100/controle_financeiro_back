import { format } from 'date-fns';
import { Request, Response } from 'express';

import { ObjetivosFinaceiros } from '../../entity/ObjetivosFinaceiros';
import CreateObjetivosServices from '../../services/objetivos/CreateObjetivosServices';
import ListObjetivosServices from '../../services/objetivos/ListObjetivosServices';

export default class ObjetivosController {
    async create(request: Request, response: Response): Promise<Response> {
        const objetivos = new ObjetivosFinaceiros();
        const createObjetivos = new CreateObjetivosServices();
       
        objetivos.nomeObjetivos = String(request.body.nomeObjetivo);
        objetivos.descricao = String(request.body.descricao);
        objetivos.dataPrevistaObjetivos = new Date(String(request.body.dataPrevistaObjetivo))
        objetivos.valorObjetivos = Number(request.body.valorObjetivo);
        objetivos.contasIdFK = Number(request.body.contasId);

        const retorno = await createObjetivos.execute(objetivos);

        return response.status(200).json(retorno);
    }

    async listMovimentacoes(request: Request, response: Response): Promise<Response> {
         const idUsuario = Number(request.body.decoded.id);
const listObjetvos = new ListObjetivosServices()
const bjetivos = await listObjetvos.execute(idUsuario);

        return response.status(200).json();
    }

    async showMovimentacoes(request: Request, response: Response): Promise<Response> {
         const idUsuario = Number(request.body.decoded.id);
        return response.status(200).json();
    }
    async deleteMovimentacoes(request: Request, response: Response): Promise<Response> {
         const idUsuario = Number(request.body.decoded.id);
        return response.status(200).json();
    }
}

