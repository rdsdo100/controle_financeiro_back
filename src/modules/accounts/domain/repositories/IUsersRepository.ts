import { IAccounts } from "../models/IAccounts";
import { ICreateAccounts } from "../models/ICreateAccounts";



export interface IAccountsRepository {
  findAll(): Promise<IAccounts[]>;
  findByName(name: string): Promise<IAccounts | undefined>;
  findById(id: string): Promise<IAccounts | undefined>;
  create(data: ICreateAccounts ): Promise<IAccounts>;
  save(acounts: IAccounts): Promise<IAccounts>;
}
