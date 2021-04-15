import { Objetivos } from "../../entity/Objetivos";
import ContasRepository from "../../repository/ContasRepository";
import ObjetivosRepository from "../../repository/ObjetivosRepository";
import CalculoObjetivos, { IRespostaCalculoObjetivos } from "../../util/CalculoObjetivos";

export interface IObjetivosCalculados {
    objetivo?: Objetivos
    cauculos: IRespostaCalculoObjetivos

}

export default class ObjetivosBusiness {

    objetivosRepository = new ObjetivosRepository()
    contasRepsitory = new ContasRepository()
    calculoObjetivos = new CalculoObjetivos()

    async inedx() {}

    async buscarObjetivosAll(idUsuario: number) {

        const listObjetivosRepository = await this.objetivosRepository.buscarObjetivosAll(idUsuario)

        let listResposrCalculadas = listObjetivosRepository.map(item => {

            return {
                objetivos : item,
                calculoResposta: this.calculoObjetivos.calculoResposta(item)
            }

        })

        return listResposrCalculadas

    }

    async concluirObjetivos() { }

    async updateObjetivosAll() { }

    async deleteObjetivos(idDelete: number , idUsuario : number) {
 
        const retorno: string = await this.objetivosRepository.deleteObjetivosId(idDelete , idUsuario )
       return retorno 
     }

    async buscarObjetivosId(idObjetivos: number , idUsuario : number) {

const retorno = await this.objetivosRepository.buscarObjetivosId(idObjetivos , idUsuario )
return retorno

     }

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