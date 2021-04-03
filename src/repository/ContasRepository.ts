import { getManager } from "typeorm";
import { Contas } from "../entity/Contas";

export default class ContasRepository {


async insertConta(conta: Contas){
   try{

    const contaRepository = getManager();
    return await contaRepository.save(Contas , conta);


   } catch(e){

   }
}

async readConta(){
   try{

    const contaRepository = getManager();
    return await contaRepository.find(Contas);


   } catch(e){

   }
}




}