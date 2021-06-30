import { getCustomRepository } from "typeorm";
import { Contas } from "../../entity/Contas";
import ContasRepository from "../../repository/ContasRepository";


export default class CreateContasServices {
    private contasRepository: ContasRepository;

    constructor() {
        this.contasRepository = getCustomRepository(ContasRepository);
    }



    async execute(conta: Contas) {
        conta.valorTotal = conta.poupanca + conta.corrente
        conta.valorTotal = Number(conta.poupanca) 
        + Number(conta.corrente) 
        + Number(conta.valorObjetivo);
        return await this.contasRepository.insertConta(conta);
    }
}