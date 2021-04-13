
import { Contas } from "../entity/Contas"
import { Objetivos } from "../entity/Objetivos"

export interface IRespostaCalculoObjetivos {

    valorPontoConta: number
    valorPontosMetas: number
    valorFaltando: number
    porcentagmAtingida: number
    porcentagmFaltanto: number

}

export default class CalculoObjetivos {


    valorPontoConta(objetivos: Objetivos): number {
        return objetivos.contasIdFK.valorConta / objetivos.contasIdFK.qtdPontos

    }
    valorPontosMetas(objetivos: Objetivos): number {
        return objetivos.valorObjetivos / objetivos.pontos
    }


    valorFaltando(objetivos: Objetivos): number {
        const valorPontosConta : number = this.valorPontoConta(objetivos)
        return objetivos.valorObjetivos - (valorPontosConta * objetivos.pontos)

    }

    porcentagmAtingida(objetivos: Objetivos): number {

        const valorFaltanto : number = this.valorFaltando(objetivos)

        return (valorFaltanto * 100) / objetivos.valorObjetivos

    }

    porcentagmFaltanto(objetivos: Objetivos): number {

        const porcentagmAtingida : number = this.porcentagmAtingida(objetivos)

        return 100 - porcentagmAtingida

    }

    calculoResposta(objetivos: Objetivos): IRespostaCalculoObjetivos {
     
        const respostas: IRespostaCalculoObjetivos = {

            valorPontoConta: this.valorPontoConta(objetivos),
            valorPontosMetas: this.valorPontosMetas(objetivos),
            valorFaltando: this.valorFaltando(objetivos),
            porcentagmAtingida: this.porcentagmAtingida(objetivos),
            porcentagmFaltanto: this.porcentagmFaltanto(objetivos),
        }

        return respostas

    }

}