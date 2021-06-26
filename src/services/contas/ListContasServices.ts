import { getCustomRepository } from "typeorm";
import ContasRepository from "../../repository/ContasRepository";


export default class ListContasServices {
    private contasRepository: ContasRepository;

    constructor() {
        this.contasRepository = getCustomRepository(ContasRepository);
    }

    async execute(idUsuario: number) {
        return await this.contasRepository.readConta(idUsuario);
    }
}