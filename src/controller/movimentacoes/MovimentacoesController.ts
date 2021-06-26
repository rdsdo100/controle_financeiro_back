import { Request, Response } from 'express';
import { Movimentacoes } from '../../entity/Movimentacoes';
import CreateMovimentacoesServices from '../../services/movimentacoes/CreateMovimentacoesServices';
export default class MovimentacoesController {

    async create(request: Request, response: Response): Promise<Response> {
        const movimentacoes = new Movimentacoes();
        const createMovimentacoes = new CreateMovimentacoesServices()
         const idUsuario = Number(request.body.decoded.id);
         const contaId = Number(request.body.contaId);
        
         movimentacoes.nomeMovimentacoes = String(request.body.nomeMovimentacoes);
        movimentacoes.valorMovimento = Number(request.body.valorMovimento);
        movimentacoes.descricao = String(request.body.descricao);
        movimentacoes.tipoEntrada = Boolean(request.body.tipoEntrada);
        movimentacoes.tipoPoupanca = Boolean(request.body.tipoPoupanca);
        movimentacoes.dataMovimento = new Date();
        movimentacoes.contasIdFK= idUsuario

        const retortnoMovimentacores = createMovimentacoes.execute(movimentacoes);

        return response.status(200).json(retortnoMovimentacores);
    }
    
}
