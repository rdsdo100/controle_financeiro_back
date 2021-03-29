import {Nivel} from './Nivel'
export default class ValidacaoNivelUsuario{

    nivel: number

    constructor(nivel : number){
this.nivel = nivel
    }

    
async buscanivelUsuario ()  : Promise<boolean>{
return true
    }


   


}