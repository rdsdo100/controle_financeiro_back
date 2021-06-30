import { Contas } from '../../entity/Contas';

export default class CalculoContas {
    async somarContas(conta: Contas): Promise<Contas> {
        conta.valorTotal = Number(conta.corrente) + Number(conta.poupanca) + Number(conta.valorObjetivo);
        return conta;
    }
}
