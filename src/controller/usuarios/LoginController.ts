import {Request, Response} from "express";
import LoginUsuariosServices from "../../services/login/LoginUsuariosServices";
import SendForgotPasswordEmailService from "../../services/login/SendForgotPasswordEmailService";



export default class LoginController {
    async login(request: Request, response: Response) {
        try {
            const loginServices = new LoginUsuariosServices();
            const email = String(request.headers.user);
            const senha = String(request.headers.password);

    console.log(email);


            const retorno = await loginServices.execute({ email, senha });

            return response.json(retorno);
        } catch (error) {
            return response.json(error);
        }
    }

    async resetPassword(request: Request, response: Response) {

 const email = String(request.body.email);

 
 const resetPassword = new SendForgotPasswordEmailService()

 await resetPassword.excute(email)
    return response.json();

    }
}