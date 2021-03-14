import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivityNotes1615743511289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'activity_notes',
            columns: [
                {
                    type: 'uuid',
                    name: 'id',
                    isPrimary: true,
                },
                {
                    type: 'uuid',
                    name: 'activity_id'
                },
                {
                    type: 'varchar',
                    name: 'title'
                },
                {
                    type: 'varchar',
                    name: 'description'
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
                    name: 'activity_notes_activity_id_foreign',
                    columnNames: ['activity_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'activities',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('activity_notes', 'activity_notes_activity_id_foreign');
        await queryRunner.dropTable('activity_notes');
    }

}
// id
// title
// description
// activity
// created_at
// updated_at