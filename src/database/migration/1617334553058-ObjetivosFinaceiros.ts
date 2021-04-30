import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ObjetivosFinaceiros1617334553058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.createTable(
            new Table({

                name: 'objetivos_finaceiros',
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
                        name: 'valor_guardado',
                        type: 'int',
                        isNullable: false,
                        default: 0
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
            'objetivos_finaceiros',
            new TableForeignKey({
                columnNames: ['contas_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contas',
                name: 'objetivos_finaceiros_contas',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
