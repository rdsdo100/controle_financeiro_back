import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGoals1626194174812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'goals',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                  name: 'account_id_fk',
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
          'goals',
          new TableForeignKey({
              columnNames: ['account_id_fk'],
              referencedColumnNames: ['id'],
              referencedTableName: 'accounts',
              name: 'accounts_goals',
          }),
      );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('goals');
      }


}
