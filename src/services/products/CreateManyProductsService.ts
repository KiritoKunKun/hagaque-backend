import { Category } from '@database/models/Category';
import { Product } from '@database/models/Product';
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

class CreateManyProductsService {
	public async execute({ products }: Request): Promise<void> {
		const categoriesRepository = getRepository(Category);

		const categories = await categoriesRepository.find();

		const productsRepository = getRepository(Product);

		const productsEntities = productsRepository.create(
			products.map((product) => ({
				...product,
				categories: categories.filter((category) =>
					product.categoriesNames
						.map((categoryName) => categoryName.toLowerCase())
						.includes(category.name.toLowerCase())
				),
			}))
		);

		await productsRepository.save(productsEntities);
	}
}

export { CreateManyProductsService };
