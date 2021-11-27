import auth from '@configs/token';
import { InvalidTokenError } from '@lib/errors';
import { CelebrateError, Joi } from 'celebrate';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface ITokenDecodeProps {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;
  const { error } = Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .validate({ authorization });

  if (error) {
    throw new CelebrateError(error.message, {
      celebrated: true,
    });
  }

  const [bearer, token] = authorization?.split(' ') as string[];

  if (
    bearer.toLowerCase() !== 'bearer' ||
    !token ||
    token.split('.').length !== 3
  ) {
    throw new InvalidTokenError(
      'The custom token format is incorrect. Please check the documentation.',
    );
  }

  try {
    const tokenDecoded = jwt.verify(token, auth.secretKey) as ITokenDecodeProps;

    req.user = {
      id: tokenDecoded.sub,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new InvalidTokenError('This token is inspired, login again');
    }

    throw error;
  }
}
