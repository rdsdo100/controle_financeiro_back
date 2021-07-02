import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Movimentacoes1617334531315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'movimentacoes',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },

                    {
                        name: 'nome_movimentacoes',
                        type: 'varchar',
                        length: '60',
                        isNullable: false,
                    },

                    {
                        name: 'tipo_entrada',
                        type: 'boolean',
                        isNullable: false,
                    },

                    {
                        name: 'tipo_poupanca',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'tipo_objetivo',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },

                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '500',
                    },

                    {
                        name: 'valor_conta_anterior',
                        type: 'NUMERIC(8,2)',
                        isNullable: false,
                        default: 0,
                    },

                    {
                        name: 'valor_movimento',
                        type: 'NUMERIC(8,2)',
                        isNullable: false,
                    },

                    {
                        name: 'estorno',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'data_estorno',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'data_movimento',
                        type: 'date',
                    },

                    {
                        name: 'contas_id_fk',
                        type: 'int',
                    },
                    {
                        name: 'objetivos_id_fk',
                        type: 'int',
                        isNullable: true
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'movimentacoes',
            new TableForeignKey({
                columnNames: ['contas_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contas',
                name: 'entradas_movimentacoes',
            }),
        );
        await queryRunner.createForeignKey(
            'movimentacoes',
            new TableForeignKey({
                columnNames: ['objetivos_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'objetivos_finaceiros',
                name: 'objetivos_finaceiros_movimentacoes',
            }),
        );




    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
