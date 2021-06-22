import UserToken from '@shared/database/entity/UserToken';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(UserToken)
export default class UsuarioTokensRepository extends Repository<UserToken> {
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({
            where: {
                token: token,
            },
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken | undefined> {
        const userToken = await this.create({
            user_id,
        });
        await this.save(userToken);

        return userToken;
    }
}


