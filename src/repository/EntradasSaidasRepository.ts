import { getConnection } from "typeorm";
import { Contas } from "../entity/Contas";
import { EntradasSaidas } from "../entity/EntradasSaidas";

export default class EntradasSaidasRepository {

    readonly conta = new Contas
    readonly entradasSaidas = new EntradasSaidas

    async insert(entradasSaidas: EntradasSaidas) {

        let salverEntradasSaidas: any
        let verificarConta: any
        let updadeContas: any

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            verificarConta = await queryRunner.manager.findOne(Contas, { id: entradasSaidas.contasIdFK.id })



            if (!verificarConta) {


                const novoValor = Number(verificarConta.valorConta) + entradasSaidas.valorMovimento

                updadeContas = await queryRunner.manager.update(Contas, entradasSaidas.contasIdFK.id, { valorConta: novoValor })

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
        }

        return this.entradasSaidas
    };


}