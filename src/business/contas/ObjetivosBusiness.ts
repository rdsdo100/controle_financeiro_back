
import { ObjetivosFinaceiros } from "../../entity/ObjetivosFinaceiros";
import ContasRepository from "../../repository/ContasRepository";
import ObjetivosRepository from "../../repository/ObjetivosRepository";
import CalculoObjetivos, { IRespostaCalculoObjetivos } from "../../util/CalculoObjetivos";

export interface IObjetivosCalculados {
    objetivo?: ObjetivosFinaceiros
    cauculos: IRespostaCalculoObjetivos

}

export default class ObjetivosBusiness {

    objetivosRepository = new ObjetivosRepository()
    contasRepsitory = new ContasRepository()
    calculoObjetivos = new CalculoObjetivos()

    async inedx() { }

    async buscarObjetivosAll(idUsuario: number) {

       
        

    }

    async concluirObjetivos() { }

    async updateObjetivos(objetivos: ObjetivosFinaceiros, idUsuario: number) {

        



    }

    async deleteObjetivos(idDelete: number, idUsuario: number) {

        
    }

    async buscarObjetivosId(idObjetivos: number, idUsuario: number) {

        
    }

    async buscarAllObjetivosContasId(idConta: number) { }

    async cadastroObjetivos(objetivos: ObjetivosFinaceiros) /*: Promise<Objetivos> */ {

        


    }

}