import { getConnection, getManager } from "typeorm";
import { Contas } from "../entity/Contas";
import { Objetivos } from "../entity/Objetivos";
import { Usuarios } from "../entity/Usuarios";

export default class ContasRepository {

   contas = new Contas
   usuarios = new Usuarios


   async buscarAllContasRpository(userId: number) {


      try {
         this.usuarios.id = userId
         const contasRepository = getManager();
         const buscarContas: any = await contasRepository.find(Contas, { usuariosIdFK: this.usuarios });

         const ListContas = buscarContas.map((item: any) => {

            this.contas.id = item.id
            this.contas.nomeConta = item.nomeConta
            this.contas.valorConta = item.valorConta
            this.contas.qtdPontos = item.qtdPontos
            this.contas.qtdPontosUsados = item.qtdPontosUsados
            this.contas.contadorMovimento = item.contadorMovimento
            this.contas.ativo = item.ativo

            return this.contas


         })


         return ListContas
      } catch (e) {
         return e
      }
   }

   async buscarSaldoContasRpository(id: number): Promise<Contas> {

      try {
         const contasRepository = getManager();
         const buscarContasId: any = await contasRepository.findOne(Contas, id);

         this.contas.id = buscarContasId.id
         this.contas.nomeConta = buscarContasId.nomeConta
         this.contas.valorConta = buscarContasId.valorConta
         this.contas.qtdPontos = buscarContasId.qtdPontos
         this.contas.qtdPontosUsados = buscarContasId.qtdPontosUsados



      } catch (e) {
         console.log(e)
      }
      return this.contas
   }



   async insertConta(conta: Contas) {
      try {

         const contaRepository = getManager();
         
         return await contaRepository.save(Contas, conta);


      } catch (e) {

      }
   }

   async readConta() {
      try {

         const contaRepository = getManager();
         return await contaRepository.find(Contas);


      } catch (e) {

      }
   }


   


}