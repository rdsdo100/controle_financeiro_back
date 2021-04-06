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
            'movimentacoes',
            new TableForeignKey({
                columnNames: ['contas_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contas',
                name: 'entradas_movimentacoes',
            }),
        );



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
