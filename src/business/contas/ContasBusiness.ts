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
    
    async updateConta(contas : Contas ){
      
        const  verificarContas = await this.contasRepository.buscarSaldoContasRpository(contas.id)
  
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