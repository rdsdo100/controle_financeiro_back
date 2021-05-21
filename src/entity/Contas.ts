import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Bancos from "./Bancos";
import { ContasAPagar } from "./ContasAPagar";
import { Movimentacoes } from "./Movimentacoes";
import { ObjetivosFinaceiros } from "./ObjetivosFinaceiros";
import { Usuarios } from "./Usuarios";

@Entity()
export class Contas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nome_conta',
        type: 'varchar',
        length: '50',
        nullable: false        
    })
    nomeConta: string

    @Column({
        name: 'valor_total',
         type: 'numeric',
        nullable: false,
        default: 0
    })
    valorTotal: number

    @Column({
        name: 'corrente',
        type: 'int',
        nullable: false,
        default: 0
    })
    corrente: number

    @Column ({
        name: 'poupanca',
        type: 'int',
        nullable: false,
        default: 0
    })
    poupanca: number


    @Column({
        name: 'ativo',
        type: 'boolean',
        default: true,

    })
    ativo: boolean

    @Column({
        name: 'bloqueado',
        type: 'boolean',
        default: false,
    })
    bloqueado: boolean

    message: string

    @ManyToOne(() => Usuarios, (usuarios) => usuarios.contas)
    @JoinColumn([{ name: 'usuarios_id_fk', referencedColumnName: 'id' }])
    usuariosIdFK: Usuarios;


    @ManyToOne(() => Bancos, (bancos) => bancos.contas)
    @JoinColumn([{ name: 'bancos_id_fk', referencedColumnName: 'id' }])
    bancosIdFK: Bancos;


    @OneToMany(() => ContasAPagar, (contasAPagar) => contasAPagar.contasIdFK)
    contasAPagar: ContasAPagar[];

    @OneToMany(() => Movimentacoes, (movimentacoes) => movimentacoes.contasIdFK)
    movimentacoes: Movimentacoes[];

    @OneToMany(() => ObjetivosFinaceiros, (objetivosFinaceiros) => objetivosFinaceiros.contasIdFK)
    objetivosFinaceiros: ObjetivosFinaceiros[];

    

}
