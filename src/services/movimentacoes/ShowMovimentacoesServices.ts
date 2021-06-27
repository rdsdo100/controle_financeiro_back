import { getCustomRepository } from "typeorm";
import AppError from "../../config/errors/AppError";
import { Movimentacoes } from "../../entity/Movimentacoes";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";



export default class ShowMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
    }

    async execute(idUsuario: number, idMovimentacao: number): Promise<Movimentacoes> {
        const movimentacao = await this.movimentacoesRepository
        .showMovimentacoesByUsuarios(idUsuario, idMovimentacao);
      
        if(!movimentacao){
            throw new AppError("não existe movimentação para esses id e usuario." , 400)
        }

        return movimentacao;
    }
}