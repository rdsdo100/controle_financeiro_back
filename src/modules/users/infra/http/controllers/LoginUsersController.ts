import LoginUserServices from '@modules/users/services/LoginUserServices';
import { Request, Response } from 'express';




export default class LoginUsersController {
  
  public async login(request: Request, response: Response): Promise<Response> {





    const email: string  = String(request.headers.email)
    const password : string  = String( request.headers.password)

    
    const login =  new  LoginUserServices()

   

    let users = await login.execute({email , password});

    return response.json(users);
  }



}


