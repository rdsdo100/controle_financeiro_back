import {EntityRepository, Repository } from 'typeorm';
import { Usuarios } from '../entity/Usuarios';

@EntityRepository(Usuarios)
export default class UsuarioRepository extends Repository<Usuarios> {
    public async findByName(nomeUsuario: string): Promise<Usuarios | undefined> {
        const prodct = await this.findOne({
            where: {
                nomeUsuario: nomeUsuario,
            },
        });

        return prodct;
    }

    public async findById(id: number): Promise<Usuarios | undefined> {
        const prodct = await this.findOne({
            where: {
                id: id,
            },
        });

        return prodct;
    }

    public async findByEmail(email: string): Promise<Usuarios | undefined> {
        const prodct = await this.findOne({
            where: {
                email: email,
            },
        });

        return prodct;
    }
}
