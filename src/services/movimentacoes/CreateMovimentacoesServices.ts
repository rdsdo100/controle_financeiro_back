import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { Movimentacoes } from '../../entity/Movimentacoes';
import ContasRepository from '../../repository/ContasRepository';
import MovimentacoesRepository from '../../repository/MovimentacoesRepository';

export default class CreateMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;
    private contasRepository: ContasRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
        this.contasRepository = getCustomRepository(ContasRepository);
    }

    async execute(movimentacoes: Movimentacoes): Promise<Movimentacoes> {
        const conta = await this.contasRepository.findOne(movimentacoes.contasIdFK);
        if (!conta) {
            throw new AppError('Conta não existe', 400);
        }
        if (!conta.ativo) {
            throw new AppError('Conta deasativada', 400);
        }

        if (!movimentacoes.tipoEntrada) {
            movimentacoes.valorMovimento = -movimentacoes.valorMovimento;
        }
        movimentacoes.valorContaAnterior = conta.valorTotal;

        if (movimentacoes.tipoPoupanca) {
            conta.poupanca = conta.poupanca + movimentacoes.valorMovimento;
        } else {
            conta.poupanca = conta.corrente + movimentacoes.valorMovimento;
        }
        conta.valorTotal = conta.corrente + conta.poupanca;

        const movimentacoesretorno = await this.movimentacoesRepository.createByMovimentacoes({
            movimentacoes,
            contas: conta,
        });

        return movimentacoesretorno;
    }
}
