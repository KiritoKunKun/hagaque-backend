import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { Product } from '../infra/typeorm/entities/Product';

export interface IProductsRepository {
	list: (params: ListProductsParams) => Promise<[Product[], number]>;
	findById: (id: string) => Promise<Product | undefined>;
	create: (product: Omit<Product, 'getAvatarUrl'>) => Promise<Product>;
	createMany: (product: CreateManyProductsDTO[]) => Promise<Product[]>;
	save: (product: Omit<Product, 'getAvatarUrl'>) => Promise<Product>;
}

export interface ListProductsParams {
	search?: string;
	page?: string;
	limit?: string;
}

export interface CreateManyProductsDTO {
	name: string;
	salePrice: number;
	rentPrice?: number;
	quantity: number;
	image?: string;
	description: string;
	serie?: string;
	periodicity?: string;
	characters?: string[];
	number?: number;
	size?: string;
	weight?: string;
	pageNumber?: number;
	paperType?: string;
	language?: string;
	bookbinding?: string;
	color?: string;
	year?: string;
	author?: string;
	publishingCompany?: string;
	format?: string;
	condition?: string;
	preservationStatus?: string;
	isbn?: string;
	barCode?: string;
	skuCode?: string;
	releaseDate?: Date;
	categories: Category[];
}
