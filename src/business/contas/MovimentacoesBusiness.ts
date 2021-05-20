import { Contas } from "../../entity/Contas";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export default class MovimentacoesBusiness {

    readonly movimentacoesRepository = new MovimentacoesRepository
    readonly contasRepository = new ContasRepository

    private recalcularContas(contas: Contas, movimentacoes: Movimentacoes) { }

    private tipoEntradas(valor: number, tipo: boolean) { }

    async buscarMovimentacoesAllUser(idUsuario: number, nomeBusca: string) { }

    async buscarMovimentacoesUser(idUsuario: number) { }

    async deleteMovimentacao() { }

    async updateMovimentacao() { }

    async movimentacaoConta(movimentacoes: Movimentacoes) {

        let retornoMovimentacoes: Movimentacoes
        let conta = await this.contasRepository.buscarSaldoContasRpository(movimentacoes.contasIdFK.id)
        
        if (conta) {
            movimentacoes.contasIdFK = conta
        }
        if (!movimentacoes.tipoEntrada) {
            movimentacoes.valorMovimento = -(movimentacoes.valorMovimento)
        }

        movimentacoes.contasIdFK.valorLivre = movimentacoes.contasIdFK.valorLivre - (movimentacoes.valorMovimento)

       retornoMovimentacoes = await this.movimentacoesRepository.insertMovimetacoesReposiroty(movimentacoes)

       retornoMovimentacoes.message = "Erro ao gerar movimentações!"

        if (retornoMovimentacoes) {
            retornoMovimentacoes.message = "Movimentações Salvo!"
        }
        return retornoMovimentacoes

    }

    async estornoConta(id: number) { }

}