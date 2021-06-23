import { Request, Response } from 'express';
import { Contas } from '../../entity/Contas';
import { Usuarios } from '../../entity/Usuarios';
import { Movimentacoes } from '../../entity/Movimentacoes';
import MovimentacoesBusiness from '../../services/movimentacoes/MovimentacoesServices';

export interface IBuscaMovimentacoes {
    idUsuario: number;
    busca: string;
    tipoBusca: string;
    pagina: number;
}

export default class EntradasSaidasController {
    async index(request: Request, response: Response): Promise<Response> {
        const movimentacoesBusiness = new MovimentacoesBusiness();
        const busca: IBuscaMovimentacoes = {
            idUsuario: Number(request.body.decoded.id),
            busca: String(request.body.busca),
            tipoBusca: String(request.body.tipoBusca),
            pagina: Number(request.body.pagina),
        };

        const retorno = await movimentacoesBusiness.buscarMovimentacoesFiltro(busca);

        return response.status(200).json(retorno);
    }

    async buscamovimentaoesUder(request: Request, response: Response): Promise<Response> {
        const movimentacoesBusiness = new MovimentacoesBusiness();
        const idUsuarios: number = Number(request.body.decoded.id);
        const retorno = await movimentacoesBusiness.buscarMovimentacoesUser(idUsuarios, '1');

        return response.status(200).json(retorno);
    }

    async registerMovimentacaoConta(request: Request, response: Response): Promise<Response> {
        try {
            const movimentacoesBusiness = new MovimentacoesBusiness();
            const conta = new Contas();
            const usuario = new Usuarios();
            const movimentacoes = new Movimentacoes();
            movimentacoes.nomeMovimentacoes = String(request.body.nomeMovimentacoes);
            movimentacoes.valorMovimento = Number(request.body.valorMovimento);
            movimentacoes.descricao = String(request.body.descricao);
            movimentacoes.tipoEntrada = Boolean(request.body.tipoEntrada);
            movimentacoes.tipoPoupanca = Boolean(request.body.tipoPoupanca);
            movimentacoes.dataMovimento = new Date();
            usuario.id = Number(request.body.decoded.id);
            conta.id = Number(request.body.contaId);
            conta.usuariosIdFK = usuario;
            movimentacoes.contasIdFK = conta;

            const retorno = await movimentacoesBusiness.registerMovimentacaoConta(movimentacoes);

            return response.status(200).json(retorno);
        } catch (e) {
            return response.status(400).json(e);
        }
    }

    async estornoConta(request: Request, response: Response): Promise<Response> {
        const movimentacoesBusiness = new MovimentacoesBusiness();
        const conta = new Contas();
        const usuario = new Usuarios();
        const movimentacoes = new Movimentacoes();

        const id = Number(request.body.id);
        const retorno = await movimentacoesBusiness.estornoConta(id);
        return response.status(200).json(retorno);
    }

    async deleteMovimentacao(request: Request, response: Response): Promise<Response> {
        try {
            const movimentacoesBusiness = new MovimentacoesBusiness();

            const usuarioId: number = Number(request.body.decoded.id);
            const movimentacoesId: number = Number(request.params.id);
            const retorno = await movimentacoesBusiness.deleteMovimentacao({ usuarioId, movimentacoesId });
            return response.status(200).json(retorno);
        } catch (e) {
            return response.status(400).json(e);
        }
    }

    async updateMovimentacao(request: Request, response: Response): Promise<Response> {
        return response.status(200).json();
    }
}
