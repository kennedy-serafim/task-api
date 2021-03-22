import { EntityRepository, Repository } from "typeorm";
import { ActivityNotes } from "../models/ActivityNotes";

@EntityRepository(ActivityNotes)
class ActivityNotesRepository extends Repository<ActivityNotes>{ }

export { ActivityNotesRepository };