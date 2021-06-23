import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { ObjetivosFinaceiros } from "../entity/ObjetivosFinaceiros";

@EntityRepository(ObjetivosFinaceiros)
export default class ObjetivosFinanceirosRepository extends Repository<ObjetivosFinaceiros> {

    async verificarObjetivosFinanceirosContas(idConta : number){
        let contaVerificacao = await createQueryBuilder("ObjetivosFinaceiros")
        .leftJoinAndSelect('ObjetivosFinaceiros.contasIdFK', 'contas')
        .where('contas.id = :id', { id: idConta })
        .getOne()

        return contaVerificacao
    }



}