import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConfigs2636194195991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      
         
      await queryRunner.query(`
      INSERT INTO users ( name, email, "password", active)
       VALUES( 'root', 'root@email.com', '123456', true);      
      `)

       
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
       
      }


}
