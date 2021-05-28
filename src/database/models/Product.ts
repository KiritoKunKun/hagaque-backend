import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	number: number;

	@Column()
	price: number;

	@Column()
	categories: string;

	@Column()
	saleAmount?: number;

	@Column()
	rentAmount?: number;

	@Column()
	image: string;

	@Column()
	description: string;

	@Column()
	isbn?: string;

	@Column()
	barCode?: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { Product };
