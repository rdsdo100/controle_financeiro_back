import { getCustomRepository } from "typeorm";
import { Movimentacoes } from "../../entity/Movimentacoes";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";



export default class ListMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
    }

    async execute(idUsuario: number )
    {

       const listMovimentacoes = await this.movimentacoesRepository.listMovimentacoesByUsuarios(idUsuario);       
        return listMovimentacoes
    }
}