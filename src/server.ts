import 'dotenv/config';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';
import uploadConfig from '@config/upload';

import './database';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(
	(
		error: Error,
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		if (error instanceof AppError) {
			return response.status(error.statusCode).json({
				status: 'error',
				message: error.message,
			});
		}

		console.log(error);

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	}
);

app.listen(3333, () => {
	console.log('Server started on port 3333!');
});
