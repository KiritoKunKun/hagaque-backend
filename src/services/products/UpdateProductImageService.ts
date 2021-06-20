import { Product } from '@database/models/Product';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

interface Request {
	id: string;
	imageFilename: string;
}

@injectable()
class UpdateProductImageService {
	constructor(
		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) {}

	public async execute({ id, imageFilename }: Request) {
		const productsRepository = getRepository(Product);

		const product = await productsRepository.findOne({ where: { id } });

		if (!product) {
			throw new AppError('O produto não foi encontrado.');
		}

		if (product.image) {
			await this.storageProvider.deleteFile(
				product.image,
				`products/${id}`
			);
		}

		const fileName = await this.storageProvider.saveFile(
			imageFilename,
			`products/${id}`
		);

		product.image = fileName;

		await productsRepository.save(product);

		return product;
	}
}

export default UpdateProductImageService;
