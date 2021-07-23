import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductImageService } from '../services/UpdateProductImageService';

class ProductImageController {
	public async update(
		request: Request,
		response: Response
	): Promise<Response> {
		const updateProductImageService = container.resolve(
			UpdateProductImageService
		);

		const user = await updateProductImageService.execute({
			id: request.params.id,
			imageFilename: request.file?.filename || '',
		});

		return response.json(classToClass(user));
	}
}

export { ProductImageController };
