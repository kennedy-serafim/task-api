import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Activity } from "./Activity";
import * as bcrypt from 'bcryptjs';
import { IsEmail, Length, MinLength } from 'class-validator';

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    @Length(3, 15)
    firstname: string;

    @Column()
    @Length(3, 15)
    lastname: string;

    @Column({ nullable: true })
    birth: Date;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @MinLength(8)
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ default: 'Moçambique' })
    country: string;

    @Column({ default: 'Maputo' })
    city: string;

    @OneToMany(() => Activity, activity => activity.user, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
    activities: Activity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkIfUnEncryptedPasswordIsValid(unEncryptedPassword: string) {
        return bcrypt.compareSync(unEncryptedPassword, this.password);
    }

}

export { User };