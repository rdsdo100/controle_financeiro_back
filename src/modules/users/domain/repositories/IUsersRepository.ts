
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findAll(): Promise<IUser[]>;
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: IUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
