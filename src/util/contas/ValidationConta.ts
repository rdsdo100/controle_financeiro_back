import { Contas } from '../../entity/Contas';

interface IResponseContas {
    isValidated: boolean;
    message?: string;
    status?: number;
}

export default class ValidationConta {
    public async isConta(conta: Contas | undefined): Promise<IResponseContas> {
        if (!conta) {
            return {
                isValidated: false,
                message: 'Conta não encontrada.',
                status: 400,
            };
        }

        if (conta.ativo) {
             return {
                 isValidated: false,
                 message: 'Conta não esta ativa.',
                 status: 400,
             };
        }

       return {
           isValidated: true
           
       };
    }
}
