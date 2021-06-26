import {MigrationInterface, QueryRunner} from "typeorm";

export class Insets1917338414365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert  into usuarios (id, nome_usuario , email , senha , administrador ) values 
        (1 , 'root' , 'root.gmail.com' , '123456' , true );
        `);

        await queryRunner.query(`
       
        insert  into bancos  (nome_banco  , url_imagem_banco) values 
        ('Nubank' , 'https://controle-finaceiro-back.herokuapp.com/nubank.png'),
        ('Banco Do Brasil' , 'https://controle-finaceiro-back.herokuapp.com/bancobrasil.png'),
        ('Bradesco' , 'https://controle-finaceiro-back.herokuapp.com/bradesco.png'),
        ('C6 Bank' , 'https://controle-finaceiro-back.herokuapp.com/c6bank.png'),
        ('Caixa' , 'https://controle-finaceiro-back.herokuapp.com/caixa.png'),
        ('Inter' , 'https://controle-finaceiro-back.herokuapp.com/inter.png'),
        ('Itau' , 'https://controle-finaceiro-back.herokuapp.com/itau.png'),
        ('Next' , 'https://controle-finaceiro-back.herokuapp.com/next.png'),
        ('Safra' , 'https://controle-finaceiro-back.herokuapp.com/safra.png'),
        ('SAntander' , 'https://controle-finaceiro-back.herokuapp.com/santander.png'),
        ('Sicoob' , 'https://controle-finaceiro-back.herokuapp.com/sicoob.png');
        `)
    }
  

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
