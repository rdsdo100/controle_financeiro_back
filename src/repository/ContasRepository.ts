import { createQueryBuilder, getConnection, getManager } from "typeorm";
import Bancos from "../entity/Bancos";
import { Contas } from "../entity/Contas";
import { ObjetivosFinaceiros } from "../entity/ObjetivosFinaceiros";

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
            this.contas.valorTotal = item.valorTotal
            this.contas.valorLivre = item.valorLivre
            this.contas.valorSeparado = item.valorSeparado
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
         this.contas.valorLivre = buscarContasId.valorLivre
         this.contas.valorSeparado = buscarContasId.valorSeparado
         this.contas.valorTotal = buscarContasId.valorTotal



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

   async readConta(idUsuario: number) {


      let retornoContas: Contas[]

      try {

         const contaRepository = await createQueryBuilder("Contas")
            .leftJoinAndSelect('Contas.bancosIdFK', 'banco')
            .leftJoinAndSelect('Contas.usuariosIdFK', 'usuarios')
            .where('usuarios.id = :id', { id: idUsuario })
            .getMany()


         retornoContas = contaRepository.map((conta: any) => {

            const contas = new Contas()
            const bancos = new Bancos()
            const usuarios = new Usuarios()

            contas.id = conta.id
            contas.nomeConta = conta.nomeConta
            contas.valorTotal = conta.valorTotal
            contas.valorLivre = conta.valorLivre
            contas.valorSeparado = conta.valorSeparado
            contas.ativo = conta.ativo
            contas.bloqueado = conta.bloqueado
            bancos.id = conta.bancosIdFK.id
            bancos.nomeBanco = conta.bancosIdFK.nomeBanco
            bancos.urlImagemBanco = conta.bancosIdFK.urlImagemBanco
            usuarios.id = conta.usuariosIdFK.id
            contas.bancosIdFK = bancos
            contas.usuariosIdFK = usuarios
            return contas

         })

         return retornoContas

      } catch (e) {

      }
   }


   async deleteContaId(idConta: number) {

      try {
         const contasRepository = getManager();
         let contaVerificacao = await createQueryBuilder("ObjetivosFinaceiros")
            .leftJoinAndSelect('ObjetivosFinaceiros.contasIdFK', 'contas')
            .where('contas.id = :id', { id: idConta })
            .getOne()

         if (!contaVerificacao) {

            contaVerificacao = await createQueryBuilder("Movimentacoes")
               .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
               .where('contas.id = :id', { id: idConta })
               .getOne()

            if (!contaVerificacao) {

               await contasRepository.delete(Contas, idConta);
               return `ID Conta ${idConta} deletado!`
            } else {
               return `Não foi possivel deletar , Já exite movimentações na conta!`
            }
         } else {
            return `Não foi possivel deletar , Já exite Obketivos vinculads a conta na conta!`
         }

      } catch (e) {
         return { Error: `Erro ao deletar!`, e }
      }

   }


}