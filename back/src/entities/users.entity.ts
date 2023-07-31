import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contacts.entity";

@Entity('users')
 export class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 60 })
    fullName: string

    @Column({ type: 'varchar', length: 45, unique: true })
    email: string

    @Column({ type: 'varchar', length: 120 })
    password: string

    @Column({ type: 'varchar', length: 13})
    telephone: string

    @CreateDateColumn({ type: 'date'})
    createdAt: Date | string

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[]
}