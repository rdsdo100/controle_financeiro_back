import { getCustomRepository } from "typeorm";
import ObjetivosFinanceirosRepository from "../../repository/ObjetivosFinanceirosRepository";


export default class DeleteObjetivosServices {
    private objetivosRepository: ObjetivosFinanceirosRepository;
    constructor() {
        this.objetivosRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }

    async execute() {}
}