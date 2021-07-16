import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import ListUserService from '@modules/users/services/ListUserService';


export default class UsersController {
  
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new  ListUserService()

    const users = await listUser.execute();

    return response.json(classToClass(users));
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const listUser = new  ListUserService()

    const users = await listUser.execute();

    return response.json(classToClass(users));
  }



}

function CreateUserService(CreateUserService: any) {
  throw new Error('Function not implemented.');
}

