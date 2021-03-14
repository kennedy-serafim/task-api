import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ActivityNotes } from "./ActivityNotes";
import { User } from "./User";

@Entity()
export class Activity {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    start: Date

    @Column()
    duration: number

    @Column()
    end: Date;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.activities)
    user: User;

    @OneToMany(() => ActivityNotes, notes => notes.activity)
    activityNotes: ActivityNotes[]

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
