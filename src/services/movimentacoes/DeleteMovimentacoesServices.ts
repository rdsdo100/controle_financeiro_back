import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { Movimentacoes } from '../../entity/Movimentacoes';
import { objetivosRouter } from '../../http/routes/objetivos.routes';
import ContasRepository from '../../repository/ContasRepository';
import MovimentacoesRepository from '../../repository/MovimentacoesRepository';
import ObjetivosFinanceirosRepository from '../../repository/ObjetivosFinanceirosRepository';

export interface IDeleteMovimentacos {
    idUsuario: number;
    idMovimentacao: number;
}

export default class DeleteMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;
    private contaRepository: ContasRepository;
    private objetivoRepository: ObjetivosFinanceirosRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
        this.contaRepository = getCustomRepository(ContasRepository);
        this.objetivoRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }

    async execute({ idUsuario, idMovimentacao }: IDeleteMovimentacos): Promise<void> {
        const movimentacao = await this.movimentacoesRepository.showMovimentacoesByUsuarios(idUsuario, idMovimentacao);
        if (!movimentacao) {
            throw new AppError('Movimenteção  não existe!', 400);
        }

        if (!movimentacao.tipoObjetivo) {
            this.deleteMoviemtacao(movimentacao);
        } else {
            this.deleteMoviemtacaoObjetivo(movimentacao);
        }
    }

    private async deleteMoviemtacao(movimentacao: Movimentacoes) {
        const conta = await this.contaRepository.findOne(movimentacao.contasIdFK);
        if (!conta) {
            throw new AppError('Conta não encontrada!', 400);
        }

        if (movimentacao.tipoPoupanca) {
            conta.poupanca = Number(conta.poupanca) - Number(movimentacao.valorMovimento);
        } else {
            conta.corrente = Number(conta.corrente) - Number(movimentacao.valorMovimento);
        }
        conta.valorTotal = Number(conta.corrente) + Number(conta.poupanca) + Number(conta.valorObjetivo);

        await this.movimentacoesRepository.deleteByMovimentacoes({ movimentacao, conta });
    }

    private async deleteMoviemtacaoObjetivo(movimentacao: Movimentacoes) {
        const conta = await this.contaRepository.findOne(movimentacao.contasIdFK);
        if (!conta) {
            throw new AppError('Conta não encontrada!', 400);
        }
        if (!movimentacao.objetivosIdFk) {
            throw new AppError('objetivos não exite', 400);
        }

        const objetivo = await this.objetivoRepository.findOne(movimentacao.objetivosIdFk);

        if (!objetivo) {
            throw new AppError('objetivo não exite', 400);
        }

        objetivo.valorGuardado = Number(objetivo.valorGuardado) - Number(movimentacao.valorMovimento);

        conta.valorTotal = Number(conta.corrente) + Number(conta.poupanca) + Number(conta.valorObjetivo);

        await this.movimentacoesRepository.deleteByMovimentacoesObjetivos({ movimentacao, conta, objetivo });
    }
}
