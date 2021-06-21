import { Contas } from "../../../entity/Contas";
import ContasRepository from "../../../repository/ContasRepository";
import MovimentacoesRepository from "../../../repository/MovimentacoesRepository";
import ObjetivosFinanceirosRepository from "../../../repository/ObjetivosFinanceirosRepository";

export default class ContasBusiness {

      /*
      private connectionsRepository: Repository<Connection>
    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }
    */

    readonly contasRepository = new ContasRepository
    readonly objetivosFinanceirosRepository = new ObjetivosFinanceirosRepository
    readonly movimentacoesRepository = new MovimentacoesRepository

    async index(idUsuario: number) {

        return await this.contasRepository.readConta(idUsuario)
    }

    async cadastrarContas(conta: Contas) {
        conta.valorTotal = (Number(conta.corrente) + Number(conta.poupanca))
        return await this.contasRepository.insertConta(conta)
    }

    async deleteConta(idConta: number , idUsuario : number) {

        try {

            let retorno
            let verificar = await this.movimentacoesRepository.verificarMovimentacoesContas(idConta)
            if (!verificar) {
                verificar = await this.objetivosFinanceirosRepository.verificarObjetivosFinanceirosContas(idConta)
                if (!verificar) {
                    retorno = await this.contasRepository.deleteContaId(idConta)
                   
                   return    retorno

                } else {
                    retorno = "Existe Objetivos Ja cadastrados."
                }

            } else {
                retorno = "Existe Movimentaçôes já cadastrados."
            }

            return retorno

        } catch (e) {
            return e
        }

    }

    async updateConta(contas: Contas) {

        const verificarContas = await this.contasRepository.buscarSaldoContasRpository(contas.id)

        if (!contas.corrente) {
            contas.corrente = verificarContas.corrente
        }

        if (!contas.poupanca) {
            contas.poupanca = verificarContas.poupanca
        }

        const  retornoContas = await this.contasRepository.updateContas(contas)
        return retornoContas
    }


}