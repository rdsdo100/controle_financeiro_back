import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { TableForeignKey } from "typeorm/schema-builder/table/TableForeignKey";

export class CreateUserTokens1626194091406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'user_tokens',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                  name: 'user_id_fk',
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
        await queryRunner.createForeignKey(
          'user_tokens',
          new TableForeignKey({
              columnNames: ['user_id_fk'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              name: 'users_user_tokens',
          }),
      );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('account');
      }


}
