import { getCustomRepository, Repository, SelectQueryBuilder } from "typeorm";
import { IBuscaMovimentacoes } from "../../controller/contas/MovimentacoesController";
import { Contas } from "../../entity/Contas";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export default class MovimentacoesBusiness {





    private recalcularContas(contas: Contas, movimentacoes: Movimentacoes) { }

    private tipoEntradas(valor: number, tipo: boolean) { }

    async buscarMovimentacoesUser(idUsuario: number, nomeBusca: string) {
        const movimentacoesRepository = new MovimentacoesRepository()

        const listMovimnentacoes = await movimentacoesRepository
        .buscarMovimentacoesUser(idUsuario)
        return listMovimnentacoes

    }

    async buscarMovimentacoesFiltro({idUsuario, busca, tipoBusca , pagina}: IBuscaMovimentacoes) {

         const movimentacoesRepository = new MovimentacoesRepository()

         const retornoBusca = await movimentacoesRepository
         .buscarMovimentacoesBusca({idUsuario, busca, tipoBusca , pagina})
        
        return retornoBusca

    }

    async deleteMovimentacao() { }

    async updateMovimentacao() { }

    async registerMovimentacaoConta(movimentacoes: Movimentacoes) {
        const movimentacoesRepository = new MovimentacoesRepository()
        const contasRepository = new ContasRepository()
        let retornoMovimentacoes: Movimentacoes
        let conta = await contasRepository.buscarSaldoContasRpository(movimentacoes.contasIdFK.id)

        if (conta) {
            movimentacoes.contasIdFK = conta
        }
        if (!movimentacoes.tipoEntrada) {
            movimentacoes.valorMovimento = -(movimentacoes.valorMovimento)
        }

        movimentacoes.contasIdFK.corrente = movimentacoes.contasIdFK.corrente - (movimentacoes.valorMovimento)

        retornoMovimentacoes = await movimentacoesRepository.insertMovimetacoesReposiroty(movimentacoes)

        retornoMovimentacoes.message = "Erro ao gerar movimentações!"

        if (retornoMovimentacoes) {
            retornoMovimentacoes.message = "Movimentações Salvo!"
        }
        return retornoMovimentacoes

    }

    async estornoConta(id: number) { }

}