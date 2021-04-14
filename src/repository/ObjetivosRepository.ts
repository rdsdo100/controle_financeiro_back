import { createQueryBuilder, getConnection, QueryBuilder } from "typeorm";
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


    async buscarObjetivosAll(idUsuario: number) {
       
    
        let listRetornoObjetivos: Objetivos[]

        let buscarObjetivos: any

        buscarObjetivos = await createQueryBuilder("Objetivos")
            .leftJoinAndSelect('Objetivos.contasIdFK', 'contas')
            .leftJoin("contas.usuariosIdFK" , "user")
           .where("user.id = :id" , {id : idUsuario})
            .getMany()



        listRetornoObjetivos = buscarObjetivos.map((item: any) => {
            let retornoObjetivos = new Objetivos()
            let contaRetorno = new Contas()
            
            contaRetorno.id = item.contasIdFK.id
            contaRetorno.nomeConta = item.contasIdFK.nomeConta
            contaRetorno.valorConta = item.contasIdFK.valorConta
            contaRetorno.qtdPontos = item.contasIdFK.qtdPontos
            contaRetorno.qtdPontosUsados = item.contasIdFK.qtdPontosUsados

            retornoObjetivos.id = item.id
            retornoObjetivos.nomeObjetivos = item.nomeObjetivos
            retornoObjetivos.valorObjetivos = item.valorObjetivos
            retornoObjetivos.pontos = item.pontos
            retornoObjetivos.dataPrevistaObjetivos = item.dataPrevistaObjetivos
            retornoObjetivos.contasIdFK = contaRetorno

            return retornoObjetivos

        })


        return listRetornoObjetivos



    }




}


