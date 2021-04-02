import { getManager } from "typeorm";
import { Contas } from "../entity/Contas";

export default class ContasRepository {


async insertConta(conta: Contas){
   try{

    const contaRepository = getManager();
    return contaRepository.save(Contas , conta);


   } catch(e){

   }
}



}