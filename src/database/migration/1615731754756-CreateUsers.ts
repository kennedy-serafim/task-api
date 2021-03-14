import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1615731754756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    type: 'uuid',
                    name: 'id',
                    isPrimary: true
                },
                {
                    type: 'varchar',
                    name: 'firstname',
                },
                {
                    type: 'varchar',
                    name: 'lastname',
                },
                {
                    type: 'date',
                    name: 'birth',
                    isNullable: true
                },
                {
                    type: 'varchar',
                    name: 'username',
                    isUnique: true
                },
                {
                    type: 'varchar',
                    name: 'email',
                    isUnique: false
                },
                {
                    type: 'varchar',
                    name: 'password',
                },
                {
                    type: 'varchar',
                    name: 'phone',
                    isNullable: true
                },
                {
                    type: 'varchar',
                    name: 'country',
                    isNullable: true
                },
                {
                    type: 'varchar',
                    name: 'city',
                    isNullable: true
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
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

// phone
// country
// city