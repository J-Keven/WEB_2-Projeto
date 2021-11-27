import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateFreela1601505378617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'freelas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'freelaForeingKeyUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('freelas');
  }
}
