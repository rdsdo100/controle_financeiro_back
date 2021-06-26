import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Contas } from '../entity/Contas';
import { Movimentacoes } from '../entity/Movimentacoes';

interface IRequest {
    movimentacoes: Movimentacoes;
    contas: Contas;
}

@EntityRepository(Movimentacoes)
export default class MovimentacoesRepository extends Repository<Movimentacoes> {
    async createByMovimentacoes({ movimentacoes, contas }: IRequest): Promise<Movimentacoes> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            movimentacoes = await queryRunner.manager.save(movimentacoes);

            await queryRunner.manager.save(contas);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err
        } finally {
            await queryRunner.release();
        }
        return movimentacoes;
    }
}
