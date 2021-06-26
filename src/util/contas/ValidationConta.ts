import { getCustomRepository } from 'typeorm';
import { Contas } from '../../entity/Contas';
import ContasRepository from '../../repository/ContasRepository';

interface IResponseConta {
    conta?: Contas;
    isContaExist?: boolean;
    messageError?: string;
}
export default class ValidationConta {
   

   

    public async isContaExist(conta: Contas): Promise<IResponseConta> {
        if (!conta) {
            return {
                isContaExist: false,
                messageError: 'Conta não existe',
            };
        }

        if (conta.ativo) {
            return {
                isContaExist: false,
                messageError: 'Conta Esta desativada',
            };
        }
        return {
            isContaExist: true,
            messageError: 'Conta Esta desativadas',
        };
    }

    
}
