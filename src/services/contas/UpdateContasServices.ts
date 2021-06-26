import { getCustomRepository } from "typeorm";
import { Contas } from "../../entity/Contas";
import ContasRepository from "../../repository/ContasRepository";

export default class UpdateContasServices {
    private contasRepository: ContasRepository;

    constructor() {
        this.contasRepository = getCustomRepository(ContasRepository);
    }

    async execute(contas: Contas) {
        const verificarContas = await this.contasRepository.buscarSaldoContasRpository(contas.id);

        if (!contas.corrente) {
            contas.corrente = verificarContas.corrente;
        }

        if (!contas.poupanca) {
            contas.poupanca = verificarContas.poupanca;
        }

        const retornoContas = await this.contasRepository.updateContas(contas);
        return retornoContas;
    }
}