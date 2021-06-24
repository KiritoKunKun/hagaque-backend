import { sign, verify } from 'jsonwebtoken';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

interface TokenPayload {
	iat: string;
	exp: string;
	sub: string;
}

interface Request {
	authHeader?: string;
}

class RefreshTokenService {
	public async execute({ authHeader }: Request): Promise<string> {
		if (!authHeader) {
			throw new AppError('JWT token is missing.', 401);
		}

		const [, token] = authHeader.split(' ');

		if (!token) {
			throw new AppError('JWT token is missing.', 401);
		}

		try {
			const decoded = verify(token, authConfig.jwt.secret as any, {
				ignoreExpiration: true,
			});

			const { sub } = decoded as TokenPayload;

			const { secret, expiresIn } = authConfig.jwt;

			const newToken = sign({}, secret ? secret : '', {
				subject: sub,
				expiresIn,
			});

			return newToken;
		} catch (error) {
			throw new AppError(error.message || 'Token JWT inválido.', 401);
		}
	}
}

export { RefreshTokenService };
