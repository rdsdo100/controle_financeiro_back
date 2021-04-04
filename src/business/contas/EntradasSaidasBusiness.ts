import { Contas } from "../../entity/Contas";
import { EntradasSaidas } from "../../entity/EntradasSaidas";
import ContasRepository from "../../repository/ContasRepository";
import EntradasSaidasRepository from "../../repository/EntradasSaidasRepository";

export default class EntradasSaidasBusiness {

    readonly conta = new Contas
    readonly entradasSaidas = new EntradasSaidas
    readonly entradasSaidasRepository = new EntradasSaidasRepository
    readonly contasRepository = new ContasRepository

    private recalcularContas(contas: Contas, entradasSaidas: EntradasSaidas): number {
        const valorMovimento: number = this.tipoEntradas(entradasSaidas.valorMovimento, entradasSaidas.tipoEntrada)
        const valorAtualizado: number = (contas.valorConta + valorMovimento)
        return valorAtualizado
    }

    private tipoEntradas(valor: number, tipo: boolean): number {
        if (tipo) {
            return valor
        } else {
            return -(valor)
        }
    }

    async index() {

        const dias: number = 100
        let data: Date = new Date()
        data.setDate(-(dias))
        return data

    }

    async moviementacaoConta(entradasSaidas: EntradasSaidas) {

        const contas: Contas = await this.contasRepository
            .buscarSaldoContasRpository(entradasSaidas.contasIdFK.id)

        const retornoSaldoConta: number = this.recalcularContas(contas, entradasSaidas)
        contas.valorConta = retornoSaldoConta
        contas.contadorMovimento = (contas.contadorMovimento + 1 )

        const retorno = await this.entradasSaidasRepository
            .insertMovimentosEntradasSaidas(entradasSaidas, contas)

        return retorno

    }

    async estornoConta() {

    }


   
}