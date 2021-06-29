import { getCustomRepository } from "typeorm";
import AppError from "../../config/errors/AppError";
import { ObjetivosFinaceiros } from "../../entity/ObjetivosFinaceiros";
import ObjetivosFinanceirosRepository from "../../repository/ObjetivosFinanceirosRepository";


export default class ShowObjetivosServices {
    private objetivosRepository: ObjetivosFinanceirosRepository;
    constructor() {
        this.objetivosRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }

    async execute(idUsuario: number): Promise<ObjetivosFinaceiros> {
        const objetivo =  await this.objetivosRepository.showObjetivosFinanceiros(idUsuario);
        if (!objetivo){
            throw new AppError("objetivo não existe." , 400)
        }
        return objetivo
    }
}