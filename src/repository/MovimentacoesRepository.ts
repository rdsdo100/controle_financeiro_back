import { getConnection } from "typeorm";
import { Contas } from "../entity/Contas";
import { Movimentacoes } from "../entity/Movimentacoes";


export default class EntradasSaidasRepository {

    readonly conta = new Contas
    readonly movimentacoes = new Movimentacoes

    async insertMovimentosEntradasSaidas(movimentacoes: Movimentacoes, conta: Contas) {




        let salvarMovimentacoes: any
        let verificarConta: any
        let updadeContas: any

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            verificarConta = await queryRunner.manager.findOne(Contas, { id: conta.id })

           


            if (verificarConta) {

                updadeContas = await queryRunner.manager.update(Contas, conta.id, { valorConta: conta.valorConta })

                salvarMovimentacoes = await queryRunner.manager.save(Movimentacoes, movimentacoes)

            }

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        if (salvarMovimentacoes) {

            this.movimentacoes.id = salvarMovimentacoes.id
            this.movimentacoes.nomeMovimentacoes = salvarMovimentacoes.nomeMovimentacoes
            this.movimentacoes.valorMovimento = salvarMovimentacoes.valorMovimento
            this.movimentacoes.descricao = salvarMovimentacoes.descricao
            this.movimentacoes.contasIdFK = salvarMovimentacoes.contasIdFK

        }

        return {movimentacoes : this.movimentacoes}
    };


}












