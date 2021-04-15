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

    async buscarObjetivosId(idObjetivos: number, idUsuario: number) {

        try {

            let retornoObjetivos = new Objetivos()
            let contaRetorno = new Contas()

            let buscarObjetivos: any = await createQueryBuilder("Objetivos", "Objetivos")
                .leftJoinAndSelect('Objetivos.contasIdFK', 'contas')
                .leftJoin("contas.usuariosIdFK", "user")
                .where("user.id = :idUser and Objetivos.id = :idObjetivos  ",
                    { idUser: idUsuario, idObjetivos: idObjetivos })
                .getOne()


            if (buscarObjetivos) {
                
                contaRetorno.id = buscarObjetivos.contasIdFK.id
                contaRetorno.nomeConta = buscarObjetivos.contasIdFK.nomeConta
                contaRetorno.valorConta = buscarObjetivos.contasIdFK.valorConta
                contaRetorno.qtdPontos = buscarObjetivos.contasIdFK.qtdPontos
                contaRetorno.qtdPontosUsados = buscarObjetivos.contasIdFK.qtdPontosUsados

                retornoObjetivos.id = buscarObjetivos.id
                retornoObjetivos.nomeObjetivos = buscarObjetivos.nomeObjetivos
                retornoObjetivos.valorObjetivos = buscarObjetivos.valorObjetivos
                retornoObjetivos.pontos = buscarObjetivos.pontos
                retornoObjetivos.dataPrevistaObjetivos = buscarObjetivos.dataPrevistaObjetivos
                retornoObjetivos.contasIdFK = contaRetorno


            }
            return retornoObjetivos

        } catch (e) {
            console.log(e)
        }

    };


    async buscarObjetivosAll(idUsuario: number) {

        let listRetornoObjetivos: Objetivos[]

        let buscarObjetivos: any

        buscarObjetivos = await createQueryBuilder("Objetivos")
            .leftJoinAndSelect('Objetivos.contasIdFK', 'contas')
            .leftJoin("contas.usuariosIdFK", "user")
            .where("user.id = :id", { id: idUsuario })
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

    async deleteObjetivosId(idDelete: number, idUsuario: number): Promise<string> {

        let resposta: string
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const verificarObjetivo: any = await queryRunner.manager
                .createQueryBuilder("Objetivos", "Objetivos")
                .leftJoinAndSelect('Objetivos.contasIdFK', 'contas')
                .leftJoin("contas.usuariosIdFK", "user")
                .where("user.id = :idUser and Objetivos.id = :idObjetivos  ", { idUser: idUsuario, idObjetivos: idDelete })
                .getOne()

            if (Number(verificarObjetivo?.id) === idDelete) {
                await queryRunner.manager.delete(Objetivos, { id: Number(verificarObjetivo.id) })
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
            resposta = "Erro ao deletar"
        } finally {
            await queryRunner.release();
            resposta = "Objetivo Deletado!"
        }

        return resposta

    }
    
    async updateObjeticos(objetivos : Objetivos , contas : Contas){

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

    }

}