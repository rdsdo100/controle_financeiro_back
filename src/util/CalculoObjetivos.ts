
import { Contas } from "../entity/Contas"
import { Objetivos } from "../entity/Objetivos"

export interface IRespostaCalculoObjetivos {

    valorPontoConta: number
    valorPontosMetas: number
    valorFaltando: number
    porcentagmAtingida: number
    porcentagmFaltanto: number

}

export default class calculoObjetivos {


    valorPontoConta(conta: Contas): number {
        return conta.valorConta / conta.qtdPontos

    }
    valorPontosMetas(objetivos: Objetivos): number {
        return objetivos.valorObjetivos / objetivos.pontos
    }


    valorFaltando(objetivos: Objetivos, conta: Contas): number {
        const valorPontosConta : number = this.valorPontoConta(conta)
        return objetivos.valorObjetivos - (valorPontosConta * objetivos.pontos)

    }

    porcentagmAtingida(objetivos: Objetivos, conta: Contas): number {

        const valorFaltanto : number = this.valorFaltando(objetivos, conta)

        return (valorFaltanto * 100) / objetivos.valorObjetivos

    }

    porcentagmFaltanto(objetivos: Objetivos, conta: Contas): number {

        const porcentagmAtingida : number = this.porcentagmAtingida(objetivos, conta)

        return 100 - porcentagmAtingida

    }

    CalculoResposta(objetivos: Objetivos, conta: Contas): IRespostaCalculoObjetivos {
     
        const respostas: IRespostaCalculoObjetivos = {

            valorPontoConta: this.valorPontoConta(conta),
            valorPontosMetas: this.valorPontosMetas(objetivos),
            valorFaltando: this.valorFaltando(objetivos, conta),
            porcentagmAtingida: this.porcentagmAtingida(objetivos, conta),
            porcentagmFaltanto: this.porcentagmFaltanto(objetivos, conta),
        }

        return respostas

    }

}