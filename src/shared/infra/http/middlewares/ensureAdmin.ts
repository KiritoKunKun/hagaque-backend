import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

interface TokenPayload {
	iat: string;
	exp: string;
	sub: string;
}

export const ensureAdmin = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token is missing', 401);
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret as any);

		const { sub } = decoded as TokenPayload;

		request.user = {
			id: sub,
		};

		const { id } = request.user;

		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne(id);

		if (!user?.isAdmin) {
			throw new AppError('O usuário não é um administrador.');
		}

		return next();
	} catch (error) {
		throw new AppError(error.message || 'Token JWT inválido.', 401);
	}
};
