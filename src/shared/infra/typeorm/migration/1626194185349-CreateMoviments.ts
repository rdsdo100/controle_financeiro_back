import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";


export class CreateMoviments1626194185349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'moviments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                  name: 'name_moviments',
                  type: 'varchar',
                  length: '60',
                  isNullable: false,
              },

              {
                  name: 'type_entrace',
                  type: 'boolean',
                  isNullable: false,
              },
            
              {
                  name: 'description',
                  type: 'varchar',
                  length: '500',
              },

             

              {
                  name: 'value_moviments',
                  type: 'NUMERIC(8,2)',
                  isNullable: false,
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
          'moviments',
          new TableForeignKey({
              columnNames: ['account_id_fk'],
              referencedColumnNames: ['id'],
              referencedTableName: 'accounts',
              name: 'moviments_accounts',
          }),
        )
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('moviments');
      }


}
