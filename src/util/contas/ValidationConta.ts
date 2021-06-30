import { Contas } from '../../entity/Contas';



export default class ValidationConta {
   

   

    public async isConta(conta: Contas): Promise<boolean> {
        
        if (conta.ativo) {
            return false
        }

        return true
        
    }    
}
