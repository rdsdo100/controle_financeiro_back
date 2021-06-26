import { getCustomRepository } from "typeorm";

import MovimentacoesRepository from "../../repository/MovimentacoesRepository";


export default class UpdateMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
    }

    async execute() {}

   
}