import { IBuscaMovimentacoes } from "../../controller/contas/MovimentacoesController";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export default class MovimentacoesBusiness {


    async buscarMovimentacoesUser(idUsuario: number, nomeBusca: string) {
        const movimentacoesRepository = new MovimentacoesRepository()

        const listMovimnentacoes = await movimentacoesRepository
            .buscarMovimentacoesUser(idUsuario)
        return listMovimnentacoes

    }

    async buscarMovimentacoesFiltro({ idUsuario, busca, tipoBusca, pagina }: IBuscaMovimentacoes) {

        const movimentacoesRepository = new MovimentacoesRepository()

        const retornoBusca = await movimentacoesRepository
            .buscarMovimentacoesBusca({ idUsuario, busca, tipoBusca, pagina })

        return retornoBusca

    }

    async deleteMovimentacao() { }

    async updateMovimentacao() { }

    async registerMovimentacaoConta(movimentacoes: Movimentacoes) {
        const movimentacoesRepository = new MovimentacoesRepository()
        const contasRepository = new ContasRepository()
        let saveMovimentacoes: Movimentacoes
        let retornoMovimentacoes: Movimentacoes
        let conta = await contasRepository.buscarSaldoContasRpository(movimentacoes.contasIdFK.id)

        if (!conta.id) {
            throw ({ message: "Conta não encontrada!" })
        }

        saveMovimentacoes = movimentacoes
        saveMovimentacoes.contasIdFK = conta
        saveMovimentacoes.valorContaAnterior = Number(conta.valorTotal)

        if (!saveMovimentacoes.tipoEntrada) {
            saveMovimentacoes.valorMovimento = -(saveMovimentacoes.valorMovimento)
        }

        if (!saveMovimentacoes.tipoPoupanca) {

            saveMovimentacoes.contasIdFK.corrente = Number(saveMovimentacoes.contasIdFK.corrente) 
            + Number(saveMovimentacoes.valorMovimento)

        } else {
            saveMovimentacoes.contasIdFK.poupanca = Number(saveMovimentacoes.contasIdFK.poupanca) 
            +Number(saveMovimentacoes.valorMovimento)
        }

        saveMovimentacoes.contasIdFK.valorTotal = Number(saveMovimentacoes.contasIdFK.corrente)
            + Number(saveMovimentacoes.contasIdFK.poupanca)

        retornoMovimentacoes = await movimentacoesRepository.insertMovimetacoesReposiroty(saveMovimentacoes)


        return retornoMovimentacoes

    }

    async estornoConta(id: number) { }

}