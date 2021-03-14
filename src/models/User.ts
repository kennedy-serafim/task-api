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

@Entity()
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    birth: Date;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @OneToMany(() => Activity, activity => activity.user)
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
}


export { User };