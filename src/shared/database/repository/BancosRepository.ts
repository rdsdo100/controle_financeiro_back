import { EntityRepository, getManager, Repository } from "typeorm";
import Bancos from "../entity/Bancos";


@EntityRepository(Bancos)
export default class BancosRepository extends Repository<Bancos> {


    async buscarbancosAll() : Promise<Bancos[]> {

        const bancosRepository = getManager();
        let listBancosRetorno: Bancos[]
        let retornoConsulta: any

        try {
            retornoConsulta = await bancosRepository.find(Bancos)
            listBancosRetorno = retornoConsulta.map((banco: any) => {
                return {
                    id: banco.id,
                    nomeBanco: banco.nomeBanco,
                    urlImagemBanco: banco.urlImagemBanco
                }

            })
            return listBancosRetorno

        } catch (e) {
            return e
        }

    }

}