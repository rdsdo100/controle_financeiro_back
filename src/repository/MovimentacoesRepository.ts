import { createQueryBuilder, getConnection, getManager } from "typeorm";
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

                await queryRunner.manager.update(Contas, conta.id, { valorConta: conta.valorConta })
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

            this.conta.id = updadeContas.id
            this.conta.nomeConta = updadeContas.nomeConta
            this.conta.valorConta = updadeContas.valorConta

            this.movimentacoes.id = salvarMovimentacoes.id
            this.movimentacoes.nomeMovimentacoes = salvarMovimentacoes.nomeMovimentacoes
            this.movimentacoes.valorMovimento = salvarMovimentacoes.valorMovimento
            this.movimentacoes.descricao = salvarMovimentacoes.descricao
            this.movimentacoes.tipoEntrada = salvarMovimentacoes.tipoEntrada
            this.movimentacoes.contasIdFK = this.conta

        }

        return this.movimentacoes
    };

    async buscarMovimentosId(movimentosId: number) {

        let buscarMovimentos: any
      

        try {
            buscarMovimentos = await createQueryBuilder("Movimentacoes")
                .leftJoinAndSelect('Movimentacoes.contasIdFK', 'contas')
               // .leftJoin('Atendimentos.usuariosIdFK', 'usuarioId')
                .where('Movimentacoes.id = :id', { id: movimentosId })
                .getOne()



                if (buscarMovimentos) {

                    this.conta.id =  buscarMovimentos.contasIdFK.id
                    this.conta.nomeConta =  buscarMovimentos.contasIdFK.nomeConta
                    this.conta.valorConta = buscarMovimentos.contasIdFK.valorConta
        
                    this.movimentacoes.id = buscarMovimentos.id
                    this.movimentacoes.nomeMovimentacoes = buscarMovimentos.nomeMovimentacoes
                    this.movimentacoes.valorMovimento = buscarMovimentos.valorMovimento
                    this.movimentacoes.descricao = buscarMovimentos.descricao
                    this.movimentacoes.tipoEntrada = buscarMovimentos.tipoEntrada
                    this.movimentacoes.contasIdFK = this.conta
        
                }

            
        } catch (e) {
            console.log(e)
        }


       

        return this.movimentacoes
    };


    async insertMovimentosEstorno(movimentacoes: Movimentacoes, conta: Contas) {

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

                await queryRunner.manager.update(Contas, conta.id, { valorConta: conta.valorConta })
                updadeContas = await queryRunner.manager.findOne(Contas, conta.id)
                await queryRunner.manager.update(Movimentacoes, movimentacoes.id, { estorno : true , dataEstorno: new Date })
                updadeMovimentações = await queryRunner.manager.findOne(Contas, conta.id)
                
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

            this.conta.id = updadeContas.id
            this.conta.nomeConta = updadeContas.nomeConta
            this.conta.valorConta = updadeContas.valorConta

            this.movimentacoes.id = salvarMovimentacoes.id
            this.movimentacoes.nomeMovimentacoes = salvarMovimentacoes.nomeMovimentacoes
            this.movimentacoes.valorMovimento = salvarMovimentacoes.valorMovimento
            this.movimentacoes.descricao = salvarMovimentacoes.descricao
            this.movimentacoes.tipoEntrada = salvarMovimentacoes.tipoEntrada
            this.movimentacoes.contasIdFK = this.conta

        }

        return this.movimentacoes
    };

}












