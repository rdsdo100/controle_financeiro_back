import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Contas } from '../entity/Contas';
import { Movimentacoes } from '../entity/Movimentacoes';
import { ObjetivosFinaceiros } from '../entity/ObjetivosFinaceiros';

interface IRequestMovimentacao {
    movimentacao: Movimentacoes;
    conta: Contas;
}

interface IRequestMovimentacaoObjetivo {
    movimentacao: Movimentacoes;
    conta: Contas;
    objetivo: ObjetivosFinaceiros
}

@EntityRepository(Movimentacoes)
export default class MovimentacoesRepository extends Repository<Movimentacoes> {
    async createByMovimentacoes({ movimentacao, conta }: IRequestMovimentacao): Promise<Movimentacoes> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            movimentacao = await queryRunner.manager.save(movimentacao);

            await queryRunner.manager.save(conta);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }

        return movimentacao;
    }

    async createByMovimentacoesObjetivos({
        movimentacao,
        conta,
        objetivo,
    }: IRequestMovimentacaoObjetivo): Promise<Movimentacoes> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            movimentacao = await queryRunner.manager.save(movimentacao);

            await queryRunner.manager.save(conta);
            await queryRunner.manager.save(objetivo);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }

        return movimentacao;
    }

    async listMovimentacoesByUsuarios(idUsuario: number): Promise<Movimentacoes[]> {
        return await this.createQueryBuilder('Movimentacoes')
            .leftJoin('Movimentacoes.contas', 'contas')
            .where('contas.usuariosIdFK = :id ', { id: idUsuario })
            .getMany();
    }

    async showMovimentacoesByUsuarios(idUsuario: number, idMovimentacao: number): Promise<Movimentacoes | undefined> {
        return await this.createQueryBuilder('Movimentacoes')
            .leftJoin('Movimentacoes.contas', 'contas')
            .where('contas.usuariosIdFK = :idUsuario and Movimentacoes.id = :idMovimentacao  ', {
                idUsuario: idUsuario,
                idMovimentacao: idMovimentacao,
            })
            .getOne();
    }

    async deleteByMovimentacoes({ movimentacao, conta }: IRequestMovimentacao): Promise<void> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.remove(movimentacao);

            await queryRunner.manager.save(conta);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteByMovimentacoesObjetivos({
        movimentacao,
        conta,
        objetivo,
    }: IRequestMovimentacaoObjetivo): Promise<void> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.remove(movimentacao);

            await queryRunner.manager.save(conta);

            await queryRunner.manager.save(objetivo);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
