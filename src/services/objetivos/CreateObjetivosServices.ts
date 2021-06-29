import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../../config/errors/AppError';
import { ObjetivosFinaceiros } from '../../entity/ObjetivosFinaceiros';
import ObjetivosFinanceirosRepository from '../../repository/ObjetivosFinanceirosRepository';

export default class CreateObjetivosServices {
    private objetivosRepository: ObjetivosFinanceirosRepository;
    constructor() {
        this.objetivosRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }

    async execute(objetivos: ObjetivosFinaceiros) {
        if (!isAfter(objetivos.dataPrevistaObjetivos, Date.now())) {
            throw new AppError('Os objetivos deve ser de no momimo um dia!', 400);
        }
        if (objetivos.valorObjetivos <= 0) {
            throw new AppError('Os valorObjetivos não pode ser 0 ou valor negatvo!', 400);
        }
        

        const objetivosSave = await this.objetivosRepository.save(objetivos);

        return objetivosSave;
    }
}
