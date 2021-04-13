import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Objetivos1617334553058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.createTable(
            new Table({

                name: 'objetivos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },

                    {
                        name: 'nome_objetivos',
                        type: 'varchar',
                        isNullable: false,
                        
                    },

                    {
                        name: 'valor_objetivos',
                        type: 'NUMERIC(8,2)',
                        isNullable: false
                    },

                    {
                        name: 'pontos',
                        type: 'int',
                        isNullable: false,
                        default: 1
                    },

                    {
                        name: 'data_prevista_objetivos',
                        type: 'date',
                        isNullable: false
                    },

                    {
                        name: 'finalizado',
                        type: 'boolean',
                        isNullable: false,
                        default: false
                    },

                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '500'
                        
                    },
                    {
                        name: 'contas_id_fk',
                        type: 'int',
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'objetivos',
            new TableForeignKey({
                columnNames: ['contas_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contas',
                name: 'objetivos_contas',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
