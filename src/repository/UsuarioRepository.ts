import { EntityRepository, Repository } from 'typeorm';
import { Usuarios } from '../entity/Usuarios';

@EntityRepository(Usuarios)
export default class UsuarioRepository extends Repository<Usuarios> {
    public async findByName(nomeUsuario: string): Promise<Usuarios | undefined> {
        return await this.findOne(nomeUsuario);
    }

    public async findById(id: number): Promise<Usuarios | undefined> {
        return await this.findOne(id);
    }

    public async findByEmail(email: string): Promise<Usuarios | undefined> {
        return await this.findOne(email);
    }
}
