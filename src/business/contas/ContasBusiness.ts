import { Contas } from "../../entity/Contas";
import ContasRepository from "../../repository/ContasRepository";

export default class ContasBusiness {

async index (idUsuario : number){
    const contasRepository = new ContasRepository
    return await contasRepository.readConta(idUsuario)
}

    async cadastrarContas (conta : Contas){


        conta.valorTotal = (Number(conta.valorLivre)  + Number(conta.valorSeparado))

        return await this.contasRepository.insertConta(conta)
    }

    async deleteConta(idConta: number){
        const contasRepository = new ContasRepository
        const  retorno = await contasRepository.deleteContaId(idConta)
return retorno


    }
    
    async updateConta(contas : Contas ){
        const contasRepository = new ContasRepository
        const  verificarContas = await contasRepository.buscarSaldoContasRpository(contas.id)
  
if(!contas.valorLivre){
    contas.valorLivre = verificarContas.valorLivre
}

        
if(!contas.valorSeparado){
    contas.valorSeparado = verificarContas.valorSeparado
}

console.log(contas)

//const  retornoContas = await this.contasRepository.updateContas(contas)


        
    }


}