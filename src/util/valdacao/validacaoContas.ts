import { Contas } from "../../entity/Contas";

export interface IContasValidacao {
    conta: Contas
    messageRetorno?: string,
    validacao: boolean
}

export default class validacaoContas {

    validarConta(conta: Contas): IContasValidacao {
        let retornoContas: IContasValidacao = {conta , validacao : true }

        return retornoContas

    }



}