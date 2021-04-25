import { getManager } from "typeorm";
import Bancos from "../entity/Bancos";

export default class BancosRepository {


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