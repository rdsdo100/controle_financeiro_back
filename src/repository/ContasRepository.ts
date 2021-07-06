import { EntityRepository, Repository } from 'typeorm';
import { Contas } from '../entity/Contas';

@EntityRepository(Contas)
export default class ContasRepository extends Repository<Contas> {
    async buscarAllContasRpository(userId: number): Promise<Contas[]> {
        return await this.find({ usuariosIdFK: userId });
    }

    async buscarSaldoContasRpository(id: number): Promise<Contas | undefined> {
        return await this.findOne(id);
    }

    async insertConta(conta: Contas) {
            return await this.save(conta);
    }

    async readConta(idUsuario: number): Promise<Contas[]> {
        
        return await this.createQueryBuilder('Contas')
            .leftJoinAndSelect('Contas.bancos', 'banco')
            .leftJoin('Contas.usuarios', 'usuarios')
            .where('usuarios.id = :id', { id: idUsuario })
            .getMany();
            
    }

    async findContasByBancosByUser(idUsuario: number, idConta: number): Promise<Contas[]> {
        return await this.createQueryBuilder('Contas')
            .leftJoinAndSelect('Contas.bancos', 'banco')
            .leftJoinAndSelect('Contas.usuarios', 'usuarios')
            .where('usuarios.id = :id and  banco.id = :idBanco', { id: idUsuario, idBanco: idConta })
            .getMany();
    }

    async deleteContaId(idConta: number): Promise<void> {
        await this.delete(idConta);
    }

    async updateContas(contas: Contas): Promise<Contas | undefined> {
         await this.update(contas.id ,contas);
          return this.findOne(contas.id)

    }
}
