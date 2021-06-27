import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import ContasRepository from '../../repository/ContasRepository';
import MovimentacoesRepository from '../../repository/MovimentacoesRepository';

export interface IDeleteMovimentacos {
    idUsuario: number;
    idMovimentacao: number;
}

export default class DeleteMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;
    private contaRepository: ContasRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
        this.contaRepository = getCustomRepository(ContasRepository);
    }

    async execute({ idUsuario, idMovimentacao }: IDeleteMovimentacos): Promise<void> {
        const movimentacao = await this.movimentacoesRepository.showMovimentacoesByUsuarios(idUsuario, idMovimentacao);
        if (!movimentacao) {
            throw new AppError('Movimenteção  não existe!', 400);
        }
        const conta = await this.contaRepository.findOne(movimentacao.contasIdFK);
        if (!conta) {
            throw new AppError('Conta não encontrada!', 400);
        }
        if(movimentacao.tipoPoupanca){
            conta.poupanca = Number(conta.poupanca) - Number(movimentacao.valorMovimento);
        }else {
            conta.corrente = Number(conta.corrente) - Number(movimentacao.valorMovimento);
        }
        conta.valorTotal = Number(conta.corrente) + Number(conta.poupanca)

        await this.movimentacoesRepository.deleteByMovimentacoes({movimentacao ,  conta})

    }
}
