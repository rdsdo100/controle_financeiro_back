import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Parcelas1617334628763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({

                name: 'parcela',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },

                    {
                        name: 'valor_parcela',
                        type: 'NUMERIC(8,2)',
                        isNullable: false
                    },

                    {
                        name: 'data_vencimento',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'data_pagamento',
                        type: 'date',
                        isNullable: false
                    },

                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '500'
                        
                    },
                    {
                        name: 'numero_parcela',
                        type: 'int',
                        
                    },

                    {
                        name: 'contas_a_pagar_id_fk',
                        type: 'int',
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'parcela',
            new TableForeignKey({
                columnNames: ['contas_a_pagar_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contas_a_pagar',
                name: 'parcelas_contas_a_pagar',
            }),
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
