import {MigrationInterface, QueryRunner} from "typeorm";

export class Insets1917338414365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert  into usuarios (id, nome_usuario , email , senha ) values 
        (1 , 'root' , 'email.gmail.com' , '123456' );
        `)

        await queryRunner.query(`
       
        insert  into bancos  (nome_banco  , url_imagem_banco) values 
        ('Nubanck' , 'http://localhost:3333/nubank.png'),
        ('Banco Do Brasil' , 'http://localhost:3333/bancobrasil.png'),
        ('Bradesco' , 'http://localhost:3333/bradesco.png'),
        ('C6 Bank' , 'http://localhost:3333/c6bank.png'),
        ('Caixa' , 'http://localhost:3333/caixa.png'),
        ('Inter' , 'http://localhost:3333/inter.png'),
        ('Itau' , 'http://localhost:3333/itau.png'),
        ('Next' , 'http://localhost:3333/next.png'),
        ('Safra' , 'http://localhost:3333/safra.png'),
        ('SAntander' , 'http://localhost:3333/santander.png'),
        ('Sicoob' , 'http://localhost:3333/sicoob.png');
        `)
    }
  

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
