import {MigrationInterface, QueryRunner} from "typeorm";

export class Insets1917338414365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert  into usuarios (id, nome_usuario , email , senha ) values 
        (1 , 'root' , 'email.gmail.com' , '123456' );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
