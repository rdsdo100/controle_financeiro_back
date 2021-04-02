import { Contas } from "../../entity/Contas";
import ContasRepository from "../../repository/ContasRepository";

export default class ContasBusiness {

readonly contasRepository = new ContasRepository

    async cadastrarContas (conta : Contas){

        return this.contasRepository.insertConta(conta)



    }


}