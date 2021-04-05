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

            if (!verificarConta) {

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
            this.movimentacoes.nomeEntradasSaidas = salvarMovimentacoes.nomeEntradasSaidas
            this.movimentacoes.valorMovimento = salvarMovimentacoes.valorMovimento
            this.movimentacoes.descricao = salvarMovimentacoes.descricao
            this.movimentacoes.contasIdFK = salvarMovimentacoes.contasIdFK


            this.conta.id = updadeContas.id
            this.conta.nomeConta =updadeContas.nomeConta
            this.conta.valorConta = updadeContas.valorConta
            this.conta.qtdPontos = updadeContas.qtdPontos
            this.conta.contadorMovimento = updadeContas.contadorMovimento
            this.conta.ativo = updadeContas.ativo
            this.conta.bloqueado = updadeContas.bloqueado
            this.conta.usuariosIdFK = updadeContas.usuariosIdFK

        }

        return {movimentacoes : this.movimentacoes , conta: this.conta }
    };


}












