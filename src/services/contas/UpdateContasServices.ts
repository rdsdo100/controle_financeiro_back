import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { Contas } from '../../entity/Contas';
import ContasRepository from '../../repository/ContasRepository';

export default class UpdateContasServices {
    private contasRepository: ContasRepository;

    constructor() {
        this.contasRepository = getCustomRepository(ContasRepository);
    }

    async execute(contas: Contas) {
        const verificarContas = await this.contasRepository.buscarSaldoContasRpository(contas.id);

        if (!verificarContas) {
            throw new AppError('Não Existte Conta para esse campo.', 400);
        }

        if (!contas.corrente) {
            contas.corrente = verificarContas.corrente;
        }

        if (!contas.poupanca) {
            contas.poupanca = verificarContas.poupanca;
        }
        contas.valorTotal = contas.poupanca + contas.corrente;

        const retornoContas = await this.contasRepository.updateContas(contas);
        return retornoContas;
    }
}
