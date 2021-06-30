import { Movimentacoes } from "../../entity/Movimentacoes";

interface IResponseMovimentacoes {
    isValidated: boolean;
    message?: string;
    status?: number;
}

export default class ValidationMovimentacoes {
    public async isConta(movimentacao: Movimentacoes | undefined): Promise<IResponseMovimentacoes> {
        if (!movimentacao) {
            return {
                isValidated: false,
                message: 'Movimentação não encontrada.',
                status: 400,
            };
        }

        return {
            isValidated: true,
        };
    }
}
