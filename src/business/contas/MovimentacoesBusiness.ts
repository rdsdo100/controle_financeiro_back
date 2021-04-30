import e from "cors";
import { Contas } from "../../entity/Contas";
import { Movimentacoes } from "../../entity/Movimentacoes";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";

export default class MovimentacoesBusiness {

    readonly movimentacoesRepository = new MovimentacoesRepository
    readonly contasRepository = new ContasRepository

    private recalcularContas(contas: Contas, movimentacoes: Movimentacoes) {

       
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

    async deleteMovimentacao(){}
    
    async updateMovimentacao(){}


    async moviementacaoConta(movimentacoes: Movimentacoes) {

     

    }

    async estornoConta(id: number) {

     

    }



}