import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Contas1617334506066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.createTable(
            new Table({

                name: 'contas',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome_conta',
                        type: 'varchar',
                        length: '50',
                        isNullable: false
                    },
                    {
                        name: 'valor_total',
                        type: 'NUMERIC(14,2)',
                        isNullable: false,
                        default: 0
                    },
                    {
                        name: 'corrente',
                        type: 'NUMERIC(14,2)',
                        isNullable: false,
                        default: 0
                    },
                    {
                        name: 'poupanca',
                        type: 'NUMERIC(14,2)',
                        isNullable: false,
                        default: 0
                    },

                    {
                        name: 'ativo',
                        type: 'boolean',
                        default: true,

                    },
                    {
                        name: 'bloqueado',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'usuarios_id_fk',
                        type: 'int',
                    },
                    {
                        name: 'bancos_id_fk',
                        type: 'int',
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'contas',
            new TableForeignKey({
                columnNames: ['usuarios_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                name: 'contas_usuarios',
            }),
        );

       await queryRunner.createForeignKey(
            'contas',
            new TableForeignKey({
                columnNames: ['bancos_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'bancos',
                name: 'bancos_contas',
            }),
        )
    }







    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
