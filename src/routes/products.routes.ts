import uploadConfig from '@config/upload';
import ProductImageController from '@controllers/ProductImageController';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { CreateManyProductsService } from '@services/products/CreateManyProductsService';
import { CreateProductService } from '@services/products/CreateProductService';
import UpdateProductImageService from '@services/products/UpdateProductImageService';
import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

const productsRouter = Router();

const productImageController = new ProductImageController();

const upload = multer(uploadConfig.multer);

productsRouter.post('/', ensureAdmin, async (request, response) => {
	const {
		name,
		salePrice,
		rentPrice,
		image,
		description,
		isbn,
		barCode,
		categoriesIds,
	} = request.body;

	const createProductService = new CreateProductService();

	await createProductService.execute({
		name,
		salePrice,
		rentPrice,
		image,
		description,
		isbn,
		barCode,
		categoriesIds,
	});

	return response.send();
});

productsRouter.post('/list', ensureAdmin, async (request, response) => {
	const { products } = request.body;

	const createManyProductsService = new CreateManyProductsService();

	await createManyProductsService.execute({ products });

	return response.send();
});

productsRouter.patch(
	'/image/:id',
	ensureAdmin,
	upload.single('image'),
	productImageController.update,
	async (request, response) => {
		try {
			const updateProductImageService = container.resolve(
				UpdateProductImageService
			);

			console.log(request.params);

			const product = await updateProductImageService.execute({
				id: request.params.id,
				imageFilename: request.file?.filename || '',
			});

			return response.json(product);
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	}
);

export { productsRouter };
