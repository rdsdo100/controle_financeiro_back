import usuarios from '@modules/contas/typeorm/entities/User';
import Usuarios  from '@shared/database/entity/Usuarios';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Usuarios)
class UsuariosRepository extends Repository<usuarios> {
    public async findByName(name: string): Promise<usuarios | undefined> {
        const prodct = await this.findOne({
            where: {
                name: name,
            },
        });

        return prodct;
    }

    public async findById(id: number): Promise<usuarios | undefined> {
        const prodct = await this.findOne({
            where: {
                id: id,
            },
        });

        return prodct;
    }

    public async findByEmail(email: string): Promise<usuarios | undefined> {
        const prodct = await this.findOne({
            where: {
                email: email,
            },
        });

        return prodct;
    }
}

export default UsuariosRepository;
