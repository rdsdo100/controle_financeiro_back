import { getCustomRepository } from "typeorm";
import { Movimentacoes } from "../../entity/Movimentacoes";

import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export default class CreateMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
    }

    async execute(movimentacoes: Movimentacoes) {
        
    }

   
}