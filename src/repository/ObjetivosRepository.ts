import { createQueryBuilder, getConnection, getManager } from "typeorm";


export default class EntradasSaidasRepository {

    async insertMovimentosEntradasSaidas() {

      
      
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
           

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

      

        
    };

    async buscarMovimentosId() {
       


        try {
            




        } catch (e) {
            console.log(e)
        }




       
    };


   

}


