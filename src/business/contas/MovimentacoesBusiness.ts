import { Contas } from "../../entity/Contas";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export default class MovimentacoesBusiness {

    readonly movimentacoesRepository = new MovimentacoesRepository
    readonly contasRepository = new ContasRepository

    private recalcularContas(contas: Contas, movimentacoes: Movimentacoes): number {

        const valorMovimento: number = this.tipoEntradas(movimentacoes.valorMovimento, movimentacoes.tipoEntrada)

        const valorAtualizado: number = Number(contas.valorConta) + Number(valorMovimento)

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
        movimentacoes.valorMovimento = Boolean(movimentacoes.tipoEntrada) ? Number(movimentacoes.valorMovimento) : Number(-(movimentacoes.valorMovimento))
        const retorno = await this.movimentacoesRepository.insertMovimentosEntradasSaidas(movimentacoes, contas)

        return retorno

    }



    async estornoConta(id: number) {

        const buscarMovimentacoes: Movimentacoes = await this.movimentacoesRepository.buscarMovimentosId(id)

        buscarMovimentacoes.nomeMovimentacoes = `estorno - ${buscarMovimentacoes.nomeMovimentacoes}`

        buscarMovimentacoes.tipoEntrada = Boolean(buscarMovimentacoes.tipoEntrada) ? false : true

        const contas: Contas = await this.contasRepository.buscarSaldoContasRpository(buscarMovimentacoes.contasIdFK.id)

        const retornoSaldoConta: number = this.recalcularContas(contas, buscarMovimentacoes)

        contas.valorConta = retornoSaldoConta

        buscarMovimentacoes.valorMovimento = Boolean(buscarMovimentacoes.tipoEntrada) ? Number(buscarMovimentacoes.valorMovimento) : Number(-(buscarMovimentacoes.valorMovimento))

        const retorno = await this.movimentacoesRepository.insertMovimentosEstorno(buscarMovimentacoes, contas)

        return retorno

    }



}