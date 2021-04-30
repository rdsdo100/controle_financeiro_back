import { createQueryBuilder, getConnection, getManager } from "typeorm";
import { Contas } from "../entity/Contas";
import { Movimentacoes } from "../entity/Movimentacoes";

export default class EntradasSaidasRepository {

    async insertMovimentosEntradasSaidas(movimentacoes: Movimentacoes, conta: Contas) {

        const  contaRetorno = new Contas()
        const movimentacoesRetorno = new Movimentacoes()
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

               // await queryRunner.manager.update(Contas, conta.id, { valorConta: conta.valorConta })
                updadeContas = await queryRunner.manager.findOne(Contas, conta.id)
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

            contaRetorno.id = updadeContas.id
            contaRetorno.nomeConta = updadeContas.nomeConta
           // contaRetorno.valorConta = updadeContas.valorConta

            movimentacoesRetorno.id = salvarMovimentacoes.id
            movimentacoesRetorno.nomeMovimentacoes = salvarMovimentacoes.nomeMovimentacoes
            movimentacoesRetorno.valorMovimento = salvarMovimentacoes.valorMovimento
            movimentacoesRetorno.descricao = salvarMovimentacoes.descricao
            movimentacoesRetorno.tipoEntrada = salvarMovimentacoes.tipoEntrada
            movimentacoesRetorno.dataMovimento = salvarMovimentacoes.dataMovimento
            movimentacoesRetorno.estorno = salvarMovimentacoes.estorno
            movimentacoesRetorno.dataEstorno = salvarMovimentacoes.dataEstorno
            movimentacoesRetorno.contasIdFK = contaRetorno

        }

        return movimentacoesRetorno
    };

    async buscarMovimentosId(movimentosId: number) {
        const  contaRetorno = new Contas()
        const movimentacoesRetorno = new Movimentacoes()

        let buscarMovimentos: any

        try {
            buscarMovimentos = await createQueryBuilder("Movimentacoes")
                .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
                .where('Movimentacoes.id = :id', { id: movimentosId })
                .getOne()

            if (buscarMovimentos) {

                contaRetorno.id = buscarMovimentos.contasIdFK.id
                contaRetorno.nomeConta = buscarMovimentos.contasIdFK.nomeConta
               // contaRetorno.valorConta = buscarMovimentos.contasIdFK.valorConta

                movimentacoesRetorno.id = buscarMovimentos.id
                movimentacoesRetorno.nomeMovimentacoes = buscarMovimentos.nomeMovimentacoes
                movimentacoesRetorno.valorMovimento = buscarMovimentos.valorMovimento
                movimentacoesRetorno.descricao = buscarMovimentos.descricao
                movimentacoesRetorno.tipoEntrada = buscarMovimentos.tipoEntrada
                movimentacoesRetorno.dataMovimento = buscarMovimentos.dataMovimento
                movimentacoesRetorno.estorno = buscarMovimentos.estorno
                movimentacoesRetorno.dataEstorno = buscarMovimentos.dataEstorno
                movimentacoesRetorno.contasIdFK = contaRetorno

            }


        } catch (e) {
            console.log(e)
        }




        return movimentacoesRetorno
    };


    async insertMovimentosEstorno(movimentacoes: Movimentacoes, conta: Contas) {

        const  contaRetorno = new Contas()
        const movimentacoesRetorno = new Movimentacoes()
        let salvarMovimentacoes: any
        let verificarConta: any
        let updadeContas: any
        let updadeMovimentações: any

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            verificarConta = await queryRunner.manager.findOne(Contas, { id: conta.id })
            if (verificarConta) {

             //   await queryRunner.manager.update(Contas, conta.id, { valorConta: conta.valorConta })
                updadeContas = await queryRunner.manager.findOne(Contas, conta.id)
                await queryRunner.manager.update(Movimentacoes, movimentacoes.id, { estorno: true, dataEstorno: new Date })
                updadeMovimentações = await queryRunner.manager.findOne(Contas, conta.id)

               salvarMovimentacoes = await queryRunner.manager.insert(Movimentacoes, movimentacoes)

            }

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        if (salvarMovimentacoes) {

            contaRetorno.id = updadeContas.id
            contaRetorno.nomeConta = updadeContas.nomeConta
           // contaRetorno.valorConta = updadeContas.valorConta

            movimentacoesRetorno.id = salvarMovimentacoes.id
            movimentacoesRetorno.nomeMovimentacoes = salvarMovimentacoes.nomeMovimentacoes
            movimentacoesRetorno.valorMovimento = salvarMovimentacoes.valorMovimento
            movimentacoesRetorno.descricao = salvarMovimentacoes.descricao
            movimentacoesRetorno.tipoEntrada = salvarMovimentacoes.tipoEntrada
            movimentacoesRetorno.dataMovimento = salvarMovimentacoes.dataMovimento
            movimentacoesRetorno.estorno = salvarMovimentacoes.estorno
            movimentacoesRetorno.dataEstorno = salvarMovimentacoes.dataEstorno
            movimentacoesRetorno.contasIdFK = contaRetorno

        }

        return movimentacoesRetorno
    };

}