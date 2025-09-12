import { GraphQLError } from 'graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { tokenModel } from '@/models/Token';

////////// Генерируем токены //////////
export const generateTokens = <T extends JwtPayload>(payload: T) => {
  const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
  if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new GraphQLError('Invalid token secret', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '3m' });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '10m' });

  return { accessToken, refreshToken };
};

////////// Валидируем токены //////////
export const validateToken = <T extends JwtPayload>(token?: string, secret?: string): T | null => {
  if (!secret) {
    throw new GraphQLError('Secret is not defined');
  }

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret) as T;
    return typeof decoded === 'object' && decoded !== null ? (decoded as T) : null;
  } catch (_error) {
    return null;
  }
};

////////// Сохраняем токен в базу //////////
export const saveToken = async (userId: string, refreshToken: string) => {
  await tokenModel.findOneAndUpdate({ userId }, { refreshToken }, { upsert: true, new: true });
};

//////////  токен //////////
export const getToken = async (refreshToken: string) => {
  return await tokenModel.findOne({ refreshToken });
};

////////// Удаляем токен //////////
export const removeToken = async (refreshToken: string) => {
  await tokenModel.deleteOne({ refreshToken });
};
