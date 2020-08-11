import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldTOProviderId1589830824947
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true, // Utiliza isso quando o prestador de serviço deletar o usuario dele e a coluna fica null
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'], // Coluna que REcebe a chave estrangeira
        referencedColumnNames: ['id'], // nomoe da coluna na tabela usuario que vai ser relacionado -> id do usuario
        referencedTableName: 'users', // A tabela que vamos fazer referencia
        onDelete: 'SET NULL', // O que vai aconecer caso o usuario delete
        onUpdate: 'CASCADE', // Caso o usuario tenha seu id Alterado, o usuario tenha seu id alterado vai manter seus relacionamentos
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
