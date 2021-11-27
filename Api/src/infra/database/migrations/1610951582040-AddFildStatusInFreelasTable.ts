import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFildStatusInFreelasTable1610951582040
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'freelas',
      new TableColumn({
        name: 'status',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('freelas', 'status');
  }
}
