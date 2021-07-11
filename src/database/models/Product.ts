import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
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
	quantity: number;

	@Column()
	image?: string;

	@Expose({ name: 'imageUrl' })
	getAvatarUrl(): string | null {
		if (!this.image) {
			return null;
		}

		switch (uploadConfig.driver) {
			case 'disk':
				return `${process.env.APP_API_URL}/files/${this.image}`;
			case 's3':
				return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/products/${this.id}/${this.image}`;
			default:
				return null;
		}
	}

	@Column()
	description: string;

	@ManyToMany(() => Category)
	@JoinTable()
	categories: Category[];

	@Column()
	serie?: string;

	@Column()
	periodicity?: string;

	@Column('varchar', { array: true })
	characters?: string[];

	@Column()
	number?: number;

	@Column()
	size?: string;

	@Column()
	weight?: string;

	@Column()
	pageNumber?: number;

	@Column()
	language?: string;

	@Column()
	bookbinding?: string;

	@Column()
	color?: string;

	@Column()
	author?: string;

	@Column()
	publishingCompany?: string;

	@Column()
	format?: string;

	@Column()
	condition?: string;

	@Column()
	preservationStatus?: string;

	@Column()
	isbn?: string;

	@Column()
	barCode?: string;

	@Column()
	skuCode?: string;

	@Column()
	releaseDate?: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export { Product };
