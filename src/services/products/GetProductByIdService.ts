import { Product } from '@database/models/Product';
import AppError from '@errors/AppError';
import { getRepository } from 'typeorm';

interface Request {
	id: string;
}

class GetProductByIdService {
	public async execute({ id }: Request): Promise<Product> {
		const productsRepository = getRepository(Product);

		const product = await productsRepository.findOne(id);

		if (!product) {
			throw new AppError('Esse produto não existe.');
		}

		return product;
	}
}

export { GetProductByIdService };
