import { EntityRepository, Repository } from 'typeorm';
import { Activity } from "../models/Activity";

@EntityRepository(Activity)
class ActivityRepository extends Repository<Activity>{ }

export { ActivityRepository };