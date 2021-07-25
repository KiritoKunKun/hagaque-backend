import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../types/ProductsRepositoryTypes';

interface Request {
	id: string;
	imageFilename: string;
}

@injectable()
class UpdateProductImageService {
	constructor(
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository
	) {}

	public async execute({ id, imageFilename }: Request) {
		const product = await this.productsRepository.findById(id);

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

		await this.productsRepository.save(product);

		return product;
	}
}

export { UpdateProductImageService };
