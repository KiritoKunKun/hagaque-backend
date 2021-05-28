import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

interface TokenPayload {
	iat: string;
	exp: string;
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): void {
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

		return next();
	} catch {
		throw new AppError('Invalid JWT token', 401);
	}
}
