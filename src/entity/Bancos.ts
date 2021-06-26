import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contas } from './Contas';

@Entity()
export default class Bancos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nome_banco',
        type: 'varchar',
        length: '50',
        nullable: false,
        unique: true,
    })
    nomeBanco: string;

    @Column({
        name: 'url_imagem_banco',
        type: 'varchar',
        length: '500',
        nullable: false,
        unique: true,
    })
    urlImagemBanco: string;

    @OneToMany(() => Contas, (contas) => contas.bancos)
    contas: Contas[];
}

