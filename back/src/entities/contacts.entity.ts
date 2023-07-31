import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('contacts')
export class Contact {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 60 })
    fullName: string

    @Column({ type: 'varchar', length: 45 })
    email: string

    @Column({ type: 'varchar', length: 13})
    telephone: string

    @CreateDateColumn({ type: 'date'})
    createdAt: Date | string

    @ManyToOne(() => User)
    user: User
}