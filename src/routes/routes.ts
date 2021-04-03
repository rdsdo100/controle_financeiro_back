
import Inicio from '../controller/Inicio'
import UsuaruiosController from "../controller/usuarios/UsuaruiosController";
import LoginController from "../controller/usuarios/LoginController";
import ContasController from '../controller/contas/ContasController';
import EntradasSaidasController from '../controller/contas/EntradasSaidasController';



const inicio = new Inicio()
const usuario = new UsuaruiosController()
const login = new LoginController()
const conta = new ContasController()
const entradasSaidas = new EntradasSaidasController()

export const routes = [
    inicio,
    usuario,
    login,
    conta,
    entradasSaidas
  

]