import BancosRepository from "../../repository/BancosRepository"

export default class BancosBusiness {

    readonly bancoRepository = new BancosRepository()

    async index (){
       return await this.bancoRepository.buscarbancosAll() 
    }
    
}