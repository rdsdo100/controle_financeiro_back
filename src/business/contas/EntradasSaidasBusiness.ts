import { Contas } from "../../entity/Contas";
import { EntradasSaidas } from "../../entity/EntradasSaidas";
import ContasRepository from "../../repository/ContasRepository";
import EntradasSaidasRepository from "../../repository/EntradasSaidasRepository";

export default class EntradasSaidasBusiness {

readonly conta = new Contas
readonly entradasSaidas = new EntradasSaidas
readonly entradasSaidasRepository = new EntradasSaidasRepository
readonly contasRepository = new ContasRepository

async index() {

    const dias: number = 100
    let data: Date = new Date()
    data.setDate(-(dias))
    return data

}

async moviementacaoConta(entradasSaidas: EntradasSaidas){
    
    
    const contas = this.contasRepository.insertConta
    
    
    
    
    
    
    return entradasSaidas

}





async estornoConta(){

}




}