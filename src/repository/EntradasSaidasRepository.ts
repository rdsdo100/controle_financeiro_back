import { getConnection } from "typeorm";
import { Contas } from "../entity/Contas";
import { EntradasSaidas } from "../entity/EntradasSaidas";

export default class EntradasSaidasRepository {

    readonly conta = new Contas
    readonly entradasSaidas = new EntradasSaidas

    async insertMovimentosEntradasSaidas(entradasSaidas: EntradasSaidas, conta: Contas) {

        let salverEntradasSaidas: any
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

                salverEntradasSaidas = await queryRunner.manager.save(EntradasSaidas, entradasSaidas)

            }

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        if (salverEntradasSaidas) {

            this.entradasSaidas.id = salverEntradasSaidas.id
            this.entradasSaidas.nomeEntradasSaidas = salverEntradasSaidas.nomeEntradasSaidas
            this.entradasSaidas.valorMovimento = salverEntradasSaidas.valorMovimento
            this.entradasSaidas.descricao = salverEntradasSaidas.descricao
            this.entradasSaidas.contasIdFK = salverEntradasSaidas.contasIdFK


            this.conta.id = updadeContas.id
            this.conta.nomeConta =updadeContas.nomeConta
            this.conta.valorConta = updadeContas.valorConta
            this.conta.qtdPontos = updadeContas.qtdPontos
            this.conta.contadorMovimento = updadeContas.contadorMovimento
            this.conta.ativo = updadeContas.ativo
            this.conta.bloqueado = updadeContas.bloqueado
            this.conta.usuariosIdFK = updadeContas.usuariosIdFK

        }

        return {entradasSaidas : this.entradasSaidas , conta: this.conta }
    };


}












