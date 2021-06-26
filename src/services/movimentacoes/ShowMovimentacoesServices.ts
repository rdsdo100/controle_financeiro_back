import { getCustomRepository } from "typeorm";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";



export default class ShowMovimentacoesServices {
    private movimentacoesRepository: MovimentacoesRepository;

    constructor() {
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
    }

  
    
}