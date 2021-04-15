import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Bancos1617334506065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({

                name: 'bancos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome_banco',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'url_imagem_banco',
                        type: 'varchar',
                        length: '500',
                        isNullable: false,
                        isUnique: true,
                    }
   
                ]
                
            })
        )

    }
   

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
