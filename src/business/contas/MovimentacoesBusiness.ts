import { Contas } from "../../entity/Contas";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export default class MovimentacoesBusiness {

    readonly movimentacoesRepository = new MovimentacoesRepository
    readonly contasRepository = new ContasRepository

    private recalcularContas(contas: Contas, movimentacoes: Movimentacoes) { }

    private tipoEntradas(valor: number, tipo: boolean) {}

    async buscarMovimentacoesAllUser(idUsuario: number , nomeBusca: string) { }

    async buscarMovimentacoesUser(idUsuario: number) { }

    async deleteMovimentacao(){}
    
    async updateMovimentacao(){}

    async moviementacaoConta(movimentacoes: Movimentacoes) { }

    async estornoConta(id: number) {}

}