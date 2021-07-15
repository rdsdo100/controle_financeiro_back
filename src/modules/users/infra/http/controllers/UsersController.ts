import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListUserService from '@modules/users/services/ListUserService';

export default class UsersController {
  
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return response.json(classToClass(users));
  }


}

function CreateUserService(CreateUserService: any) {
  throw new Error('Function not implemented.');
}

