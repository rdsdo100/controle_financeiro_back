import { getCustomRepository } from "typeorm";
import ContasRepository from "../../repository/ContasRepository";
import MovimentacoesRepository from "../../repository/MovimentacoesRepository";
import ObjetivosFinanceirosRepository from "../../repository/ObjetivosFinanceirosRepository";


export default class DeleteContasServices {
    private contasRepository: ContasRepository;
    private movimentacoesRepository: MovimentacoesRepository;
    private objetivosFinanceirosRepository: ObjetivosFinanceirosRepository;

    constructor() {
        this.contasRepository = getCustomRepository(ContasRepository);
        this.movimentacoesRepository = getCustomRepository(MovimentacoesRepository);
        this.objetivosFinanceirosRepository = getCustomRepository(ObjetivosFinanceirosRepository);
    }

    async execute(idConta: number, idUsuario: number) {
        try {
            let retorno;
          //  let verificar = await this.movimentacoesRepository.verificarMovimentacoesContas(idConta);
          ///  if (!verificar) {
           //     verificar = await this.objetivosFinanceirosRepository.verificarObjetivosFinanceirosContas(idConta);
           //     if (!verificar) {
            //        retorno = await this.contasRepository.deleteContaId(idConta);

             //       return retorno;
          //      } else {
           //         retorno = 'Existe Objetivos Ja cadastrados.';
           //     }
           // } else {
          //      retorno = 'Existe Movimentaçôes já cadastrados.';
        //    }

            return retorno;
        } catch (e) {
            return e;
        }
    }
}