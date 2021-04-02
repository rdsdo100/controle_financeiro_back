import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
} from "typeorm";
import { Contas } from "./Contas";


@Entity()
export class Usuarios extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nome_usuario', length: 50 })
    nomeUsuario: string;

    @Column({ length: 90, unique: true })
    email: string;

    @Column({ length: 30 })
    senha: string;

    @Column()
    ativo: boolean;

    @Column()
    bloqueado: boolean;


    @OneToMany(() => Contas, (contas) => contas.usuariosIdFK)
    contas: Contas[];
    
}
