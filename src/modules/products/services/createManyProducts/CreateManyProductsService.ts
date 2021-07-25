import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import {
	CreateManyProductsDTO,
	IProductsRepository,
} from '@modules/products/types/ProductsRepositoryTypes';
import { inject, injectable } from 'tsyringe';
import { getRepository } from 'typeorm';

interface Request {
	products: {
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
		categoriesNames: string[];
	}[];
}

@injectable()
class CreateManyProductsService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository
	) {}

	public async execute({ products }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const categories = await categoriesRepository.find();

		const newProducts: CreateManyProductsDTO[] = products.map(
			(product) => ({
				...product,
				categories: categories.filter((category) =>
					product.categoriesNames
						.map((categoryName) => categoryName.toLowerCase())
						.includes(category.name.toLowerCase())
				),
			})
		);

		await this.productsRepository.createMany(newProducts);
	}
}

export { CreateManyProductsService };
