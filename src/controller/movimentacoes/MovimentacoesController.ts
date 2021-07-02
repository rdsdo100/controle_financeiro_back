import { NextFunction, Request, Response } from 'express';
import { Movimentacoes } from '../../entity/Movimentacoes';
import { objetivosRouter } from '../../http/routes/objetivos.routes';
import CreateMovimentacoesServices from '../../services/movimentacoes/CreateMovimentacoesServices';
import DeleteMovimentacoesServices from '../../services/movimentacoes/DeleteMovimentacoesServices';
import ListMovimentacoesServices from '../../services/movimentacoes/ListMovimentacoesServices';
import ShowMovimentacoesServices from '../../services/movimentacoes/ShowMovimentacoesServices';

export default class MovimentacoesController {
    async create(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const movimentacao = new Movimentacoes();
        const createMovimentacao = new CreateMovimentacoesServices();
       
        const idUsuario = Number(request.body.decoded.id);
        const contaId = Number(request.body.contaId);
         const objetivoId = Number(request.body.objetivoId);
        let retortnoMovimentacores;
        movimentacao.nomeMovimentacoes = String(request.body.nomemovimentacao);
        movimentacao.valorMovimento = Number(request.body.valorMovimento);
        movimentacao.descricao = String(request.body.descricao);
        movimentacao.tipoEntrada = Boolean(request.body.tipoEntrada);
        movimentacao.tipoPoupanca = Boolean(request.body.tipoPoupanca);
        movimentacao.tipoObjetivo = Boolean(request.body.tipoObjetivo);
        movimentacao.contasIdFK = contaId;
      if(objetivoId){
          movimentacao.objetivosIdFk = objetivoId
      }
        movimentacao.dataMovimento = new Date();

     
            retortnoMovimentacores = await createMovimentacao.execute(movimentacao);
        

        return response.status(200).json(retortnoMovimentacores);
    }

    async listMovimentacoes(request: Request, response: Response): Promise<Response> {
        const idUsuario = Number(request.body.decoded.id);
        const listMovimentacoes = new ListMovimentacoesServices();
        const movimentacoes = await listMovimentacoes.execute(idUsuario);
        return response.status(200).json(movimentacoes);
    }

    async showMovimentacoes(request: Request, response: Response): Promise<Response> {
        const idUsuario = Number(request.body.decoded.id);
        const idMovimentacao = Number(request.params.id);
        const showMovimentacoes = new ShowMovimentacoesServices();
        const movimentacoes = await showMovimentacoes.execute(idUsuario, idMovimentacao);
        return response.status(200).json(movimentacoes);
    }
    async deleteMovimentacoes(request: Request, response: Response): Promise<Response> {
        const idUsuario = Number(request.body.decoded.id);
        const idMovimentacao = Number(request.params.id);
        const deleteMovimentacao = new DeleteMovimentacoesServices();
        const movimentacoes = await deleteMovimentacao.execute({ idUsuario, idMovimentacao });
        return response.status(200).json(movimentacoes);
    }
}
