import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTablePivoCategorieIdFreelaId1603548641169
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'freelaCategorie',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'categoriesId',
            type: 'uuid',
          },
          {
            name: 'freelasId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'categorieForeingKey',
            columnNames: ['categoriesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),

          new TableForeignKey({
            name: 'freelaForeingKey',
            columnNames: ['freelasId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'freelas',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('freelaCategorie');
  }
}
