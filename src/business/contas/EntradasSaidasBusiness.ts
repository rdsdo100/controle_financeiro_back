import { Contas } from "../../entity/Contas";
import { EntradasSaidas } from "../../entity/EntradasSaidas";

export default class EntradasSaidasBusiness {



readonly conta = new Contas
readonly entradasSaidas = new EntradasSaidas


async index() {

    const dias: number = 100
    let data: Date = new Date()
    data.setDate(-(dias))
    return data

}

async moviementacaoConta(entradasSaidas: EntradasSaidas){
    return entradasSaidas

}





async estornoConta(){

}




}