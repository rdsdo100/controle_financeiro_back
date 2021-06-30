import { isAfter } from 'date-fns';
import { ObjetivosFinaceiros } from '../../entity/ObjetivosFinaceiros';

interface IResponseObjetivos {
    isValidated: boolean;
    message?: string;
    status?: number;
}

export default class Validationobjetivos {
    isObjetivos(objetivos: ObjetivosFinaceiros): IResponseObjetivos {
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
