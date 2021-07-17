import { IAccounts } from '@modules/accounts/domain/models/IAccounts';
import { ICreateAccounts } from '@modules/accounts/domain/models/ICreateAccounts';
import { IAccountsRepository } from '@modules/accounts/domain/repositories/IUsersRepository';

import { getRepository, Repository } from 'typeorm';
import Accounts from '../entities/Accounts';


export  default class AccountsRepository implements IAccountsRepository {
    private ormRepository: Repository<Accounts>;

    constructor() {
        this.ormRepository = getRepository(Accounts);
    }

    findAll(): Promise<IAccounts[]> {
        return this.ormRepository.find()
    }
    findByName(name: string): Promise<IAccounts | undefined> {
        return this.ormRepository.findOne(name)
    }
    findById(id: string): Promise<IAccounts | undefined> {
        return this.ormRepository.findOne(id)
    }
    create(data : ICreateAccounts): Promise<IAccounts> {
       return this.ormRepository.save(data)
    }
    save(acounts: IAccounts): Promise<IAccounts> {
        return this.ormRepository.save(acounts)
    }

    
}


