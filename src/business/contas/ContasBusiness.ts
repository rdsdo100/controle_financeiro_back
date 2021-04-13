import { Contas } from "../../entity/Contas";
import ContasRepository from "../../repository/ContasRepository";



export default class ContasBusiness {

readonly contasRepository = new ContasRepository


async index (){

    return await this.contasRepository.readConta()
}

    async cadastrarContas (conta : Contas){

        return await this.contasRepository.insertConta(conta)
    }

    async deleteConta(){}
    
    async updateConta(){}


}