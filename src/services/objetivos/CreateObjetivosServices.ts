import { getCustomRepository } from "typeorm";
import ObjetivosFinanceirosRepository from "../../repository/ObjetivosFinanceirosRepository";


export default class CreateObjetivosServices {
    
      private objetivosRepository: ObjetivosFinanceirosRepository
    constructor() {
        this.objetivosRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }
    

   
async execute() {

}

}