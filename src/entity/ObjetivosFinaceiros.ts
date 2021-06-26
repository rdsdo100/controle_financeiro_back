import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contas } from "./Contas";

@Entity({ name: 'objetivos_finaceiros' })
export class ObjetivosFinaceiros {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nome_objetivos',
        type: 'varchar',
        nullable: false,
    })
    nomeObjetivos: string;

    @Column({
        name: 'valor_objetivos',
        type: 'numeric',
        nullable: false,
    })
    valorObjetivos: number;

    @Column({
        name: 'valor_guardado',
        type: 'int',
        nullable: false,
        default: 0,
    })
    valorGuardado: number;

    @Column({
        name: 'data_prevista_objetivos',
        type: 'date',
        nullable: false,
    })
    dataPrevistaObjetivos: Date;

    @Column({
        name: 'finalizado',
        type: 'boolean',
        nullable: false,
    })
    finalizado: boolean;

    @Column({
        name: 'descricao',
        type: 'varchar',
        length: '500',
    })
    descricao: string;

    @ManyToOne(() => Contas, (contas) => contas.objetivosFinaceiros)
    @JoinColumn([{ name: 'contas_id_fk', referencedColumnName: 'id' }])
    contas: Contas;
    
    @Column({ name: 'contas_id_fk' })
    contasIdFK: number;
}
