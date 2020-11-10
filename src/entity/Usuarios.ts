import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn, BaseEntity
} from "typeorm";


@Entity()
export class Usuarios extends BaseEntity {

@PrimaryGeneratedColumn()
    id: number

    @Column({name: "nome_usuario"})
    nomeUsuario: string

    @Column({unique:true})
    email: string

    @Column()
    senha: string

    @Column()
    matricula: string

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;


}
