import { Objetivos } from "../entity/Objetivos"

export interface IRespostaCalculoObjetivos {

    valorPontoConta: number
    valorPontosMetas: number
    valorFaltando: number
    porcentagmAtingida: number
    porcentagmFaltanto: number

}

export default class CalculoObjetivos {

    arrendondar(numero: number): number {
        if(numero < 0 ){
            numero = 0
        }
        return Number(numero.toFixed(3))
    }

    valorPontoConta(objetivos: Objetivos): number {
        let resposta = objetivos.contasIdFK.valorConta / objetivos.contasIdFK.qtdPontos
        return this.arrendondar(resposta)

    }
    valorPontosMetas(objetivos: Objetivos): number {
        let resposta = objetivos.valorObjetivos / objetivos.pontos
        return this.arrendondar(resposta)
    }


    valorFaltando(objetivos: Objetivos): number {
        const valorPontosConta: number = this.valorPontoConta(objetivos)
        let resposta = objetivos.valorObjetivos - (valorPontosConta * objetivos.pontos)
        return this.arrendondar(resposta)

    }

    porcentagmFaltanto(objetivos: Objetivos): number {

        const valorFaltanto: number = this.valorFaltando(objetivos)
        let resposta = (valorFaltanto * 100) / objetivos.valorObjetivos
        return this.arrendondar(resposta)

    }

    porcentagmAtingida(objetivos: Objetivos): number {

        const porcentagmAtingida: number = this.porcentagmFaltanto(objetivos)
        let resposta = Number(100 - porcentagmAtingida)
        return this.arrendondar(resposta)

    }

    calculoResposta(objetivos: Objetivos): IRespostaCalculoObjetivos {

        const respostas: IRespostaCalculoObjetivos = {

            valorPontoConta: this.valorPontoConta(objetivos),
            valorPontosMetas: this.valorPontosMetas(objetivos),
            valorFaltando: this.valorFaltando(objetivos),
            porcentagmFaltanto: this.porcentagmFaltanto(objetivos),
            porcentagmAtingida: this.porcentagmAtingida(objetivos),

        }

        return respostas

    }

}