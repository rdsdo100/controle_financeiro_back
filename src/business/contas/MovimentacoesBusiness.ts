import { Contas } from "../../entity/Contas";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import EntradasSaidasRepository from "../../repository/MovimentacoesRepository";

export default class MovimentacoesBusiness {

    readonly conta = new Contas
    readonly movimentacoes = new Movimentacoes
    readonly entradasSaidasRepository = new EntradasSaidasRepository
    readonly contasRepository = new ContasRepository

    private recalcularContas(contas: Contas, movimentacoes: Movimentacoes): number {
        const valorMovimento: number = this.tipoEntradas(movimentacoes.valorMovimento, movimentacoes.tipoEntrada)
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

    async moviementacaoConta(movimentacoes: Movimentacoes) {

        const contas: Contas = await this.contasRepository
            .buscarSaldoContasRpository(movimentacoes.contasIdFK.id)

        const retornoSaldoConta: number = this.recalcularContas(contas, movimentacoes)
        contas.valorConta = retornoSaldoConta
        contas.contadorMovimento = (contas.contadorMovimento + 1 )

        const retorno = await this.entradasSaidasRepository
            .insertMovimentosEntradasSaidas(movimentacoes, contas)

        return retorno

    }

    async estornoConta() {

    }


   
}