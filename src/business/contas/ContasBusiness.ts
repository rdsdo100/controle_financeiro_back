import { Contas } from "../../entity/Contas";
import ContasRepository from "../../repository/ContasRepository";



export default class ContasBusiness {

readonly contasRepository = new ContasRepository


async index (idUsuario : number){

    return await this.contasRepository.readConta(idUsuario)
}

    async cadastrarContas (conta : Contas){


        conta.valorTotal = (Number(conta.valorLivre)  + Number(conta.valorSeparado))

        return await this.contasRepository.insertConta(conta)
    }

    async deleteConta(idConta: number){

        const  retorno = await this.contasRepository.deleteContaId(idConta)
return retorno


    }
    
    async updateConta(){}


}