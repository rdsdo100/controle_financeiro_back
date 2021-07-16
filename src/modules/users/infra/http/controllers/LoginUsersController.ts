import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import LoginUserServices from '@modules/users/services/LoginUserServices';


export default class LoginUsersController {
  
  public async login(request: Request, response: Response): Promise<Response> {
    const email: string  = String(request.headers.email)
    const password : string  = String( request.headers.password)
    const login = new  LoginUserServices()

    const users = await login.execute( {email , password});

    return response.json(classToClass(users));
  }



}

function CreateUserService(CreateUserService: any) {
  throw new Error('Function not implemented.');
}

