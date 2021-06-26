import { getCustomRepository } from "typeorm";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export interface IDeleteMovimentacos {
    usuarioId: number,
    movimentacoesId: number
}

export default class DeleteMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
    }

    async execute({ usuarioId, movimentacoesId }: IDeleteMovimentacos) {
    
    }
}