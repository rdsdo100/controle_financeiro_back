import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableForeignKey } from 'typeorm/schema-builder/table/TableForeignKey';

export class CreateAccounts1626139583146 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
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
                        name: 'user_id_fk',
                        type: 'int',
                    },
                    {
                        name: 'bank_id_fk',
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
            'accounts',
            new TableForeignKey({
                columnNames: ['bank_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'banks',
                name: 'banks_accounts',
            }),
        );

        await queryRunner.createForeignKey(
            'accounts',
            new TableForeignKey({
                columnNames: ['user_id_fk'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                name: 'users_accounts',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('account');
    }
}
