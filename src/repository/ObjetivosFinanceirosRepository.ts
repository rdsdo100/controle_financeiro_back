import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { ObjetivosFinaceiros } from "../entity/ObjetivosFinaceiros";

@EntityRepository(ObjetivosFinaceiros)
export default class ObjetivosFinanceirosRepository extends Repository<ObjetivosFinaceiros> {
    async verificarObjetivosFinanceirosContas(idConta: number): Promise<ObjetivosFinaceiros | undefined> {
        return await this.createQueryBuilder('ObjetivosFinaceiros')
            .leftJoinAndSelect('ObjetivosFinaceiros.contasIdFK', 'contas')
            .where('contas.id = :id', { id: idConta })
            .getOne();
    }
    async listObjetivosFinanceiros(idUsuario: number): Promise<ObjetivosFinaceiros[]> {
        return await this.createQueryBuilder('ObjetivosFinaceiros')
            .leftJoin('ObjetivosFinaceiros.contas', 'contas')
            .leftJoin('contas.usuarios', 'usuarios')
            .where('usuarios.id = :id', { id: idUsuario })
            .getMany();
    }
    async showObjetivosFinanceiros(idUsuario: number): Promise<ObjetivosFinaceiros | undefined> {
        return await this.createQueryBuilder('ObjetivosFinaceiros')
            .leftJoin('ObjetivosFinaceiros.contas', 'contas')
            .leftJoin('contas.usuarios', 'usuarios')
            .where('usuarios.id = :id', { id: idUsuario })
            .getOne();
    }
}