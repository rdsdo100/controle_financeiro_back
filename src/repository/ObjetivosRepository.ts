import { getConnection } from "typeorm";
import { Contas } from "../entity/Contas";
import { Objetivos } from "../entity/Objetivos";


export default class EntradasSaidasRepository {

    async insertMovimentosEntradasSaidas() {

        const contaRetorno = new Contas()
        const retornoObjetivos = new Objetivos()

        let salvarObjetivos: any
        let updadeContas: any

        
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



        if (salvarObjetivos) {

            contaRetorno.id = updadeContas.id
            contaRetorno.nomeConta = updadeContas.nomeConta
            contaRetorno.valorConta = updadeContas.valorConta


            retornoObjetivos.id = salvarObjetivos.id
            retornoObjetivos.nomeObjetivos = salvarObjetivos.nomeObjetivos
            retornoObjetivos.valorObjetivos = salvarObjetivos.valorObjetivos
            retornoObjetivos.pontos = salvarObjetivos.pontos
            retornoObjetivos.dataPrevistaObjetivos = salvarObjetivos.dataPrevistaObjetivos



        }


    };

    async buscarMovimentosId() {



        try {





        } catch (e) {
            console.log(e)
        }





    };




}


