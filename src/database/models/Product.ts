import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';

@Entity('products')
class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	salePrice: number;

	@Column()
	rentPrice?: number;

	@Column()
	image: string;

	@Column()
	description: string;

	@Column()
	isbn?: string;

	@Column()
	barCode?: string;

	@ManyToMany(() => Category)
	@JoinTable()
	categories: Category[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { Product };
