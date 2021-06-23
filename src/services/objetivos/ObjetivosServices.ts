import { ObjetivosFinaceiros } from "../../entity/ObjetivosFinaceiros";
import ContasRepository from "../../repository/ContasRepository";
import ObjetivosRepository from "../../repository/ObjetivosFinanceirosRepository";

export default class ObjetivosServices {
    /*
      private connectionsRepository: Repository<Connection>
    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }
    */

    objetivosRepository = new ObjetivosRepository();
    contasRepsitory = new ContasRepository();

    async buscarObjetivosAllUser(idUsuario: number, nomeBusca: string) {}

    async buscarObjetivosUser(idUsuario: number) {}

    async concluirObjetivos() {}

    async updateObjetivos(objetivos: ObjetivosFinaceiros, idUsuario: number) {}

    async deleteObjetivos(idDelete: number, idUsuario: number) {}

    async buscarObjetivosId(idObjetivos: number, idUsuario: number) {}

    async buscarAllObjetivosContasId(idConta: number) {}

    async registerObjetivos(objetivos: ObjetivosFinaceiros) /*: Promise<Objetivos> */ {}
}