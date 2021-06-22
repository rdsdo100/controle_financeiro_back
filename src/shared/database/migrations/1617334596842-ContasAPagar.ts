import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ContasAPagar1617334596842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        
        await queryRunner.createTable(
            new Table({

                name: 'contas_a_pagar',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },

                    {
                        name: 'nome_contas_a_pagar',
                        type: 'varchar',
                        length: '80',
                        isNullable: false,
                        isUnique: true
                    },

                    {
                        name: 'valor_total_contas_a_pagar',
                        type: 'NUMERIC(8,2)',
                        isNullable: false
                    },

                    {
                        name: 'data_vencimento',
                        type: 'date',
                        isNullable: false
                    },

                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '500'
                        
                    },
                    {
                        name: 'qtd_parcelas',
                        type: 'int',
                    },

                    {
                        name: 'contas_id_fk',
                        type: 'int',
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'contas_a_pagar',
            new TableForeignKey({
                columnNames: ['contas_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contas',
                name: 'contas_a_pagar_contas',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
