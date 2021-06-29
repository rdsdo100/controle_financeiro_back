import { getCustomRepository } from 'typeorm';
import { ObjetivosFinaceiros } from '../../entity/ObjetivosFinaceiros';
import ObjetivosFinanceirosRepository from '../../repository/ObjetivosFinanceirosRepository';

export default class ListObjetivosServices {
    private objetivosRepository: ObjetivosFinanceirosRepository;
    constructor() {
        this.objetivosRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }

    async execute(idUsuario: number): Promise<ObjetivosFinaceiros[]> {
        return await this.objetivosRepository.listObjetivosFinanceiros(idUsuario);
    }
}
