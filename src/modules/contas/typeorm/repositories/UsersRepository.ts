import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const prodct = await this.findOne({
            where: {
                name: name,
            },
        });

        return prodct;
    }

    public async findById(id: string): Promise<User | undefined> {
      const prodct = await this.findOne({
          where: {
              id: id,
          },
      });

      return prodct;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const prodct = await this.findOne({
        where: {
            email,
        },
    });

    return prodct;
}
}

export default UserRepository;
