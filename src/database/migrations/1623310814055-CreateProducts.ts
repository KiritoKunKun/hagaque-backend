import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1623310814055 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'products',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'salePrice',
						type: 'money',
					},
					{
						name: 'rentPrice',
						type: 'money',
						isNullable: true,
					},
					{
						name: 'image',
						type: 'varchar',
					},
					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'isbn',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'barCode',
						type: 'varchar',
						isNullable: true,
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
			})
		);

		await queryRunner.createTable(
			new Table({
				name: 'products_categories_categories',
				columns: [
					{
						name: 'productsId',
						type: 'uuid',
					},
					{
						name: 'categoriesId',
						type: 'uuid',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('products_categories_categories');
		await queryRunner.dropTable('products');
	}
}
