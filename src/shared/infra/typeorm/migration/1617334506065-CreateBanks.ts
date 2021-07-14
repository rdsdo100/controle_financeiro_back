import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateBanks1617334506065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({

                name: 'banks',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome_banks',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'url_image_banks',
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
