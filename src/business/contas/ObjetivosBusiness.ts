import { Objetivos } from "../../entity/Objetivos";
import ContasRepository from "../../repository/ContasRepository";
import ObjetivosRepository from "../../repository/ObjetivosRepository";

export default class ObjetivosBusiness {

    objetivosRepository = new ObjetivosRepository()
    contasRepsitory = new ContasRepository()
    async inedx() {


    }



    async buscarObjetivosAll() {

        const listObjetivosRepository = this.objetivosRepository.buscarObjetivosAll()

        return listObjetivosRepository

    }

    async concluirObjetivos() { }

    async updateObjetivosAll() { }

    async deleteObjetivosAll() { }

    async buscarObjetivosId(idObjetivos: number) { }

    async buscarAllObjetivosContasId(idConta: number) { }



    async cadastroObjetivos(objetivos: Objetivos) /*: Promise<Objetivos> */ {

        let contas = await this.contasRepsitory.buscarSaldoContasRpository(objetivos.contasIdFK.id)



        if ((contas.qtdPontosUsados >= 0) &&
            (contas.qtdPontosUsados <= contas.qtdPontos) &&
            (contas.qtdPontos >= objetivos.pontos)
        ) {
            contas.qtdPontosUsados = contas.qtdPontosUsados + objetivos.pontos
        }




        const retornoObjetivos = await this.objetivosRepository.insertObjetivos(objetivos, contas)


        return retornoObjetivos

    }


}