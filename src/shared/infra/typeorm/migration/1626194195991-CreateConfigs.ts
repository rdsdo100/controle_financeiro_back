import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConfigs1626194195991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'confgs',
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
          'confgs',
          new TableForeignKey({
              columnNames: ['user_id_fk'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              name: 'users_confgs',
          }),
      );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('confgs');
      }


}
