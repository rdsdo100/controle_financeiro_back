import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Contas } from "./Contas";

@Entity()
export class Objetivos {
    @PrimaryGeneratedColumn()
    id: number;

   @Column({
        name: 'nome_objetivos',
        type: 'varchar',
        nullable: false,
        
    })
    nomeObjetivos: string

    @Column({
        name: 'valor_objetivos',
        type: 'numeric',
        nullable: false
    })
    valorObjetivos: number

    @Column({
        name: 'pontos',
        type: 'int',
        nullable: false,
        default: 1
    
    })
    pontos: number


    @Column({
        name: 'data_prevista_objetivos',
        type: 'date',
        nullable: false
    })
    dataPrevistaObjetivos: Date

    @Column({
        name: 'descricao',
        type: 'varchar',
        length: '500'
        
    })
    descricao: string

    
    @ManyToOne(() => Contas, (contas) => contas.objetivos)
    @JoinColumn([{ name: 'contas_id_fk', referencedColumnName: 'id' }])
    contasIdFK: Contas;

}
