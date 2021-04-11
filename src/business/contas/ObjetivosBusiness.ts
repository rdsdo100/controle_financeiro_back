import { Objetivos } from "../../entity/Objetivos";
import ObjetivosRepository from "../../repository/ObjetivosRepository";

export default class ObjetivosBusiness {

     objetivosRepository = new ObjetivosRepository()
    async inedx() {


     }

    
    async cadastroObjetivos(objetivos: Objetivos) : Promise<Objetivos> {
const  retorno = await this.objetivosRepository.insertObjetivos(objetivos)

        
        return retorno
    }


}