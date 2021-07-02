import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { Movimentacoes } from '../../entity/Movimentacoes';
import ContasRepository from '../../repository/ContasRepository';
import MovimentacoesRepository from '../../repository/MovimentacoesRepository';
import ObjetivosFinanceirosRepository from '../../repository/ObjetivosFinanceirosRepository';

export default class CreateMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;
    private contasRepository: ContasRepository;
    private objetivoRepository: ObjetivosFinanceirosRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
        this.contasRepository = getCustomRepository(ContasRepository);
        this.objetivoRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }

    async execute(movimentacao: Movimentacoes) /*: Promise<Movimentacoes>*/ {
        const conta = await this.contasRepository.findOne(movimentacao.contasIdFK);

        if (!conta) {
            throw new AppError('Conta não existe', 400);
        }
        if (!conta.ativo) {
            throw new AppError('Conta deasativada', 400);
        }

        if (!movimentacao.tipoEntrada) {
            movimentacao.valorMovimento = -movimentacao.valorMovimento;
        }

        movimentacao.valorContaAnterior = conta.valorTotal;

        if (!movimentacao.tipoObjetivo) {
            if (movimentacao.tipoPoupanca) {
                conta.poupanca = Number(conta.poupanca) + Number(movimentacao.valorMovimento);
            } else {
                conta.poupanca = Number(conta.corrente) + Number(movimentacao.valorMovimento);
            }
            conta.valorTotal = Number(conta.poupanca) + Number(conta.corrente) + Number(conta.valorObjetivo);

            const movimentacoesretorno = await this.movimentacoesRepository.createByMovimentacoes({
                movimentacao,
                conta: conta,
            });
        } else {
            
            const objetivo = await this.objetivoRepository.findOne(movimentacao.objetivosIdFk);

            if (!objetivo) {
                throw new AppError(`Objetivos não existe`, 400);
            }
            objetivo.valorGuardado = movimentacao.valorMovimento;
            conta.valorObjetivo = movimentacao.valorMovimento;

            conta.valorTotal = Number(conta.poupanca) + Number(conta.corrente) + Number(conta.valorObjetivo);

            const movimentacoesretorno = await this.movimentacoesRepository.createByMovimentacoesObjetivos({
                movimentacao,
                conta: conta,
                objetivo,
            });
        }
    }
}
