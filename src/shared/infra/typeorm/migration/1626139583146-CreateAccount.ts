import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAccount1626139583146 implements MigrationInterface {

 
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'account',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
              {
                name: 'name_account',
                type: 'varchar',
              },
              {
                name: 'value_account',
                type: 'int',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },

            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('account');
      }

}
