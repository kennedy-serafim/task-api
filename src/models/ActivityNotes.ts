import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from 'uuid';
import { Length, MinLength } from "class-validator";
import { Activity } from "./Activity";

@Entity("activity_notes")
export class ActivityNotes {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    @Length(3, 30)
    title: string;

    @Column()
    @MinLength(3)
    description: string;

    @ManyToOne(() => Activity, activity => activity.activityNotes, { onDelete: 'CASCADE' })
    activity: Activity;

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
