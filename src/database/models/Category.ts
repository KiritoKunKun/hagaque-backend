import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	parentId?: string;

	children?: Category[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { Category };
