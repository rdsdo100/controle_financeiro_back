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
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'valor_conta',
                        type: 'NUMERIC(8,2)',
                        isNullable: false,
                        default: 0
                    },
                    {
                        name: 'qtd_pontos',
                        type: 'int',
                        isNullable: false,
                        default: 100
                    },

                    {
                        name: 'contador_movimento',
                        type: 'int',
                        isNullable: false,
                        default: 1
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
    }







    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
