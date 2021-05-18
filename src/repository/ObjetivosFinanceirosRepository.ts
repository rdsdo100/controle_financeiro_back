import { createQueryBuilder } from "typeorm";

export default class ObjetivosFinanceirosRepository {

    async verificarObjetivosFinanceirosContas(idConta : number){
        let contaVerificacao = await createQueryBuilder("ObjetivosFinaceiros")
        .leftJoinAndSelect('ObjetivosFinaceiros.contasIdFK', 'contas')
        .where('contas.id = :id', { id: idConta })
        .getOne()

        return contaVerificacao
    }



}