import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivities1615742355082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "activities",
            columns: [
                {
                    type: "uuid",
                    name: 'id',
                    isPrimary: true
                },
                {
                    type: 'uuid',
                    name: 'user_id'
                },
                {
                    type: 'varchar',
                    name: 'title'
                },
                {
                    type: 'text',
                    name: 'description',
                    isNullable: true
                },
                {
                    type: 'date',
                    name: 'start'
                },
                {
                    type: 'date',
                    name: 'end',
                    isNullable: true
                },
                {
                    type: 'integer',
                    name: "duration",
                    default: 1
                },
                {
                    type: 'varchar',
                    name: 'status',
                    default: "Pendente"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },

            ],
            foreignKeys: [
                {
                    name: 'activities_user_id_foreign',
                    columnNames: ["user_id"],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('activities', 'activities_user_id_foreign');
        await queryRunner.dropTable('activities');
    }

}
