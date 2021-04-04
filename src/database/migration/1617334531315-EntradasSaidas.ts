import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class EntradasSaidas1617334531315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({

                name: 'entradas_saidas',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },

                    {
                        name: 'nome_entradas_saidas',
                        type: 'varchar',
                        length: '60',
                        isNullable: false,
                        isUnique: true,
                    },

                    {
                        name: 'tipo_entrada',
                        type: 'boolean',
                        isNullable: false,
                        isUnique: true,
                    },
                  
                    

                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '500'
                        
                    },

                    {
                        name: 'valor_movimento',
                        type: 'NUMERIC(8,2)',
                        isNullable: false
                    },

                    {
                        name: 'contas_id_fk',
                        type: 'int',
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'entradas_saidas',
            new TableForeignKey({
                columnNames: ['contas_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contas',
                name: 'entradas_saidas_contas',
            }),
        );



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
