import { IBuscaMovimentacoes } from "../../controller/contas/MovimentacoesController";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export interface IDeleteMovimentacos {
    usuarioId: number,
    movimentacoesId: number
}

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

    async deleteMovimentacao({ usuarioId, movimentacoesId }: IDeleteMovimentacos) {
       
        const movimentacoesRepository = new MovimentacoesRepository()
        const movimentacoes: Movimentacoes = await movimentacoesRepository
            .buscarMovimentacoesUserId(usuarioId, movimentacoesId)

            if (!movimentacoes.id) {
                throw ({ message: `Movimentação id: ${movimentacoesId} não encontrada!` })
            }

            if(movimentacoes.tipoPoupanca){
                movimentacoes.contasIdFK.poupanca = Number(movimentacoes.contasIdFK.poupanca) 
                - Number(movimentacoes.valorMovimento)
            }else{
                movimentacoes.contasIdFK.corrente = Number(movimentacoes.contasIdFK.corrente) 
                - Number(movimentacoes.valorMovimento)
            }
            movimentacoes.contasIdFK.valorTotal = Number(movimentacoes.contasIdFK.corrente)
            + Number(movimentacoes.contasIdFK.poupanca)
           const retorno: string = await movimentacoesRepository.deleteMovimetacoesReposiroty(movimentacoes.id , movimentacoes.contasIdFK)

        return retorno

    }

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
                + Number(saveMovimentacoes.valorMovimento)
        }

        saveMovimentacoes.contasIdFK.valorTotal = Number(saveMovimentacoes.contasIdFK.corrente)
            + Number(saveMovimentacoes.contasIdFK.poupanca)

        retornoMovimentacoes = await movimentacoesRepository.insertMovimetacoesReposiroty(saveMovimentacoes)


        return retornoMovimentacoes

    }

    async estornoConta(id: number) { }

}