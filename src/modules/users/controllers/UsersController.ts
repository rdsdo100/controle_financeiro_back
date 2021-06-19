import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUsertService";

export default class UsersController {


  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    
    const users = await listUsers.excute();

    return response.json(users);
}


public async create(request: Request, response: Response): Promise<Response> {
   
  const { name,email, password } = request.body;
    const createUsers = new CreateUserService();
    const user = await createUsers.excute({ name,email, password });
    return response.json(user);
}

}
