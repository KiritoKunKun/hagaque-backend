import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';
import ProductImageController from 'src/controllers/ProductImageController';
import { ensureAdmin } from 'src/middlewares/ensureAdmin';
import { CreateProductService } from 'src/services/products/CreateProductService';
import UpdateProductImageService from 'src/services/products/UpdateProductImageService';
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
		categories,
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
		categories,
	});

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
