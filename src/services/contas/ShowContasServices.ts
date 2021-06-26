import { getCustomRepository } from "typeorm";
import ContasRepository from "../../repository/ContasRepository";


export default class ShowContasServices {
    private contasRepository: ContasRepository;

    constructor() {
        this.contasRepository = getCustomRepository(ContasRepository);
    }

    async execute(idConta : number, idUsuarios: number) {
        return await this.contasRepository.findContasByBancosByUser(idUsuarios , idConta);
    }
}