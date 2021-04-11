import { getConnection } from "typeorm";
import { Contas } from "../entity/Contas";
import { Objetivos } from "../entity/Objetivos";


export default class EntradasSaidasRepository {

    async insertObjetivos(objetivos: Objetivos, contas: Contas) {

        const contaRetorno = new Contas()
        const retornoObjetivos = new Objetivos()

        let salvarObjetivos: any
        let updadeContas: any

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            updadeContas = await queryRunner.manager
                .save(Contas, contas)
            salvarObjetivos = await queryRunner.manager
                .save(Objetivos, objetivos)

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
            contaRetorno.qtdPontos = updadeContas.qtdPontos
            contaRetorno.qtdPontosUsados = updadeContas.qtdPontosUsados

            retornoObjetivos.id = salvarObjetivos.id
            retornoObjetivos.nomeObjetivos = salvarObjetivos.nomeObjetivos
            retornoObjetivos.valorObjetivos = salvarObjetivos.valorObjetivos
            retornoObjetivos.pontos = salvarObjetivos.pontos
            retornoObjetivos.dataPrevistaObjetivos = salvarObjetivos.dataPrevistaObjetivos
            retornoObjetivos.contasIdFK = contaRetorno


        }


        return retornoObjetivos
    };

    async buscarObjetivosId() {



        try {





        } catch (e) {
            console.log(e)
        }





    };




}


