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
						name: 'quantity',
						type: 'integer',
						default: 0,
					},
					{
						name: 'image',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'description',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'serie',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'periodicity',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'characters',
						type: 'varchar',
						isNullable: true,
						isArray: true,
					},
					{
						name: 'number',
						type: 'integer',
						isNullable: true,
					},
					{
						name: 'size',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'weight',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'pageNumber',
						type: 'integer',
						isNullable: true,
					},
					{
						name: 'language',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'bookbinding',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'color',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'author',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'publishingCompany',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'format',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'condition',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'preservationStatus',
						type: 'varchar',
						isNullable: true,
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
						name: 'skuCode',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'releaseDate',
						type: 'timestamp',
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
