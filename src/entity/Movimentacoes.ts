import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contas } from "./Contas";
import { ObjetivosFinaceiros } from "./ObjetivosFinaceiros";

@Entity()
export class Movimentacoes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nome_movimentacoes',
        type: 'varchar',
        length: '60',
        nullable: false,
    })
    nomeMovimentacoes: string;

    @Column({
        name: 'tipo_entrada',
        type: 'boolean',
        nullable: false,
    })
    tipoEntrada: boolean;

    @Column({
        name: 'tipo_poupanca',
        type: 'boolean',
        nullable: false,
        default: true,
    })
    tipoPoupanca: boolean;
    @Column({
        name: 'tipo_objetivo',
        type: 'boolean',
        nullable: false,
        default: true,
    })
    tipoObjetovo: boolean;

    @Column({
        name: 'descricao',
        type: 'varchar',
        length: '500',
    })
    descricao: string;

    @Column({
        name: 'valor_conta_anterior',
        type: 'numeric',
        nullable: false,
        default: 0,
    })
    valorContaAnterior: number;

    @Column({
        name: 'valor_movimento',
        type: 'numeric',
        nullable: false,
    })
    valorMovimento: number;

    @Column({
        name: 'estorno',
        type: 'boolean',
        default: false,
    })
    estorno: boolean;

    @Column({
        name: 'data_estorno',
        type: 'date',
        nullable: true,
    })
    dataEstorno: Date;

    @Column({
        name: 'data_movimento',
        type: 'date',
    })
    dataMovimento: Date;

    @ManyToOne(() => Contas, (contas) => contas.movimentacoes)
    @JoinColumn([{ name: 'contas_id_fk', referencedColumnName: 'id' }])
    contas: Contas;

    @Column({ name: 'contas_id_fk' })
    contasIdFK: number;

    @ManyToOne(() => ObjetivosFinaceiros, (objetivo) => objetivo.movimentacoes)
    @JoinColumn([{ name: 'contas_id_fk', referencedColumnName: 'id' }])
    objetivos: ObjetivosFinaceiros;

    @Column({ name: 'objetivos_id_fk' })
    objetivos_id_fk: number;
}
