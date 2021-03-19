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
import { IsDate, MinLength } from 'class-validator';

@Entity("activities")
export class Activity {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    @MinLength(3)
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column()
    @IsDate()
    start: Date

    @Column({ default: 1 })
    duration: number

    @Column({ nullable: true })
    end: Date;

    @Column({ default: "Pendente" })
    status: string;

    @ManyToOne(() => User, user => user.activities, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => ActivityNotes, notes => notes.activity, { onDelete: "CASCADE" })
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
