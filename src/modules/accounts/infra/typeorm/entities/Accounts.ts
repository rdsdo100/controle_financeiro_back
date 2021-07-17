import { IAccounts } from '@modules/accounts/domain/models/IAccounts';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('accounts')
export default class Accounts implements IAccounts {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column( {
    name: 'name_account',
    type: 'varchar'
})
   nameAccount: string;

   @Column({
    name: 'value_account',
    type: 'int',
})
  valueAccount: number;
  
  @Column({
    name: 'user_id_fk',
    type: 'int',
})
  userIdFk: number;

  @Column({
    name: 'bank_id_fk',
    type: 'int',
})
  bankIdFk: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}


