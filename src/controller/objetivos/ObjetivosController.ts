import { Request, Response } from 'express';
import { Contas } from '../../entity/Contas';
import ObjetivosBusiness from '../../services/objetivos/ObjetivosServices';
import { ObjetivosFinaceiros } from '../../entity/ObjetivosFinaceiros';

export default class ObjetivosController {
    readonly objetivosBusiness = new ObjetivosBusiness();

    async buscarObjetivosAll(request: Request, response: Response): Promise<Response> {
        const idUsuario: number = Number(request.body.decoded.id);

        return response.status(200).json({ ok: 'resposta' });
    }

    async buscarObjetivosId(request: Request, response: Response): Promise<Response> {
        const idObjetivos: number = Number(request.params.id);
        const idUsuario: number = Number(request.body.decoded.id);
        return response.status(200).json({});
    }

    async buscarAllObjetivosContasId(request: Request, response: Response): Promise<Response> {
        return response.status(200).json({});
    }

    async cadastroObjetivos(request: Request, response: Response): Promise<Response> {
        const objetivosFinaceiros = new ObjetivosFinaceiros();
        const conta = new Contas();
        objetivosFinaceiros.nomeObjetivos = String(request.body.nomeObjetivos);
        objetivosFinaceiros.valorObjetivos = Number(request.body.valorObjetivos);
        objetivosFinaceiros.valorGuardado = Number(request.body.valorGuardado);
        objetivosFinaceiros.descricao = String(request.body.descricao);
        objetivosFinaceiros.dataPrevistaObjetivos = new Date(String(request.body.dataPrevistaObjetivos));
        conta.id = Number(request.body.contaId);
        objetivosFinaceiros.contasIdFK = conta;

        return response.status(200).json({});
    }

    async concluirObjetivos(request: Request, response: Response): Promise<Response> {
        return response.status(200).json({});
    }

    async updateObjetivosAll(request: Request, response: Response): Promise<Response> {
        const objetivosFinaceiros = new ObjetivosFinaceiros();
        const conta = new Contas();
        const idUsuario: number = Number(request.body.decoded.id);
        objetivosFinaceiros.id = Number(request.body.idObjetivos);
        objetivosFinaceiros.nomeObjetivos = String(request.body.nomeObjetivos);
        objetivosFinaceiros.valorObjetivos = Number(request.body.valorObjetivos);
        objetivosFinaceiros.valorGuardado = Number(request.body.valorGuardado);
        objetivosFinaceiros.descricao = String(request.body.descricao);
        objetivosFinaceiros.dataPrevistaObjetivos = new Date(String(request.body.dataPrevistaObjetivos));
        conta.id = Number(request.body.contaId);
        objetivosFinaceiros.contasIdFK = conta;

        return response.status(200).json({});
    }

    async deleteObjetivos(request: Request, response: Response): Promise<Response> {
        const idDelete: number = Number(request.params.id);
        const idUsuario: number = Number(request.body.decoded.id);

        return response.status(200).json({});
    }
}
