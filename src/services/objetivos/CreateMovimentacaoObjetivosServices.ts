import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { Movimentacoes } from '../../entity/Movimentacoes';
import { ObjetivosFinaceiros } from '../../entity/ObjetivosFinaceiros';
import ContasRepository from '../../repository/ContasRepository';
import MovimentacoesRepository from '../../repository/MovimentacoesRepository';
import ObjetivosFinanceirosRepository from '../../repository/ObjetivosFinanceirosRepository';

export default class CreateMovimentacaoObjetivosServices {
    private objetivosRepository: ObjetivosFinanceirosRepository;
    private movimentacoesRepository: MovimentacoesRepository;
    private contasRepository: ContasRepository;
    constructor() {
        this.objetivosRepository = getCustomRepository(ObjetivosFinanceirosRepository);
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
        this.contasRepository = getCustomRepository(ContasRepository);
    }

    async execute(movimentacao: Movimentacoes): Promise<Movimentacoes> {
        const conta = await this.contasRepository.findOne(movimentacao.contasIdFK);
        const objetivo = await this.objetivosRepository.findOne(movimentacao.objetivos_id_fk);

        if (!objetivo) {
            throw new AppError('Objetivo não exite não existe', 400);
        }
        if (!isAfter(objetivo.dataPrevistaObjetivos, Date.now())) {
            throw new AppError('Os objetivos dcom data vencida!', 400);
        }

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

       objetivo.valorGuardado = Number(objetivo.valorGuardado) + Number(movimentacao.valorMovimento)
       conta.valorObjetivo = Number(conta.valorObjetivo) + Number(movimentacao.valorMovimento)
       conta.valorTotal = Number(conta.poupanca) + Number(conta.corrente) + Number(conta.valorObjetivo)

        const movimentacoesretorno = await this.movimentacoesRepository.createByMovimentacoes({
            movimentacao,
            conta: conta,
        });

        return movimentacoesretorno;
    }
}
