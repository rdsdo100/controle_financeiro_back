import { getCustomRepository } from "typeorm";
import { Contas } from "../../entity/Contas";
import ContasRepository from "../../repository/ContasRepository";


export default class CreateContasServices {
    private contasRepository: ContasRepository;

    constructor() {
        this.contasRepository = getCustomRepository(ContasRepository);
    }


    async execute(conta: Contas) {
        conta.valorTotal = Number(conta.corrente) + Number(conta.poupanca);
        return await this.contasRepository.insertConta(conta);
    }
}