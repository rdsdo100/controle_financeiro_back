import { EntityRepository, Repository } from 'typeorm';
import Bancos from '../entity/Bancos';

@EntityRepository(Bancos)
export default class BancosRepository extends Repository<Bancos> {
   
    async buscarbancosAll(): Promise<Bancos[]> {
        return await this.find();
    }
}
