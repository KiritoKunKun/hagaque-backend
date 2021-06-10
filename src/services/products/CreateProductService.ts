import { Category } from '@database/models/Category';
import { Product } from '@database/models/Product';
import { getRepository } from 'typeorm';

interface Request {
	name: string;
	salePrice: number;
	rentPrice?: number;
	image: string;
	description: string;
	isbn?: string;
	barCode?: string;
	categories: Category[];
}

class CreateProductService {
	public async execute({
		name,
		salePrice,
		rentPrice,
		image,
		description,
		isbn,
		barCode,
		categories,
	}: Request): Promise<void> {
		const productsRepository = getRepository(Product);

		const product = productsRepository.create({
			name,
			salePrice,
			rentPrice,
			image,
			description,
			isbn,
			barCode,
			categories,
		});

		await productsRepository.save(product);
	}
}

export { CreateProductService };
