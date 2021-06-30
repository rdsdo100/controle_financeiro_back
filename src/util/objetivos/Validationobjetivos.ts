import { isAfter } from 'date-fns';
import { ObjetivosFinaceiros } from '../../entity/ObjetivosFinaceiros';

interface IResponseObjetivos {
    isValidated: boolean;
    message?: string;
    status?: number;
}

export default class ValidationObjetivos {
    isObjetivos(objetivos: ObjetivosFinaceiros | undefined): IResponseObjetivos {
        
        if(!objetivos){
            return   {
                isValidated: false,
                message: 'Objetivo não encontrado!',
                status: 400,
            };
        }
        
        if (!isAfter(objetivos.dataPrevistaObjetivos, Date.now())) {
            return {
                isValidated: false,
                message: 'Os objetivos deve ser de no momimo um dia!',
                status: 400,
            };
        }
        if (objetivos.valorObjetivos <= 0) {
            return {
                isValidated: false,
                message: 'Os valorObjetivos não pode ser 0 ou valor negatvo!',
                status: 400,
            };
        }
        return {
            isValidated: true,
        };
    }
}
