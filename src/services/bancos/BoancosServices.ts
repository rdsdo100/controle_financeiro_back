import { getCustomRepository, Repository } from "typeorm"
import Bancos from "../../entity/Bancos"
import BancosRepository from "../../repository/BancosRepository"

export default class BancosServices
 {
    private bancosRepository: Repository<Bancos>;

    constructor() {
        this.bancosRepository = getCustomRepository(BancosRepository);
    }

    async index() {
        return await this.bancosRepository.find();
    }
}