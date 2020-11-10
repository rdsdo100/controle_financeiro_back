import ExemplosController from '../controller/ExemplosController'
import Inicio from '../controller/Inicio'
import UsuaruiosController from "../controller/UsuaruiosController";
import LoginController from "../controller/LoginController";
import TestController from '../controller/TesteController';


const inicio = new Inicio()
const exemplos = new ExemplosController()
const usuario = new UsuaruiosController()
const login = new LoginController()
const testController = new TestController()


export const routes = [
    inicio, 
    exemplos,
    usuario,
    login, ,
    testController
]