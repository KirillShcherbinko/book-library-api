import { GraphQLError } from 'graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { Token } from '@/model/Token';

////////// Парсинг файлов куки //////////
export const parseCookies = (req: IncomingMessage): Record<string, string> => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return {};
  }

  return Object.fromEntries(
    cookieHeader.split(';').map((cookie) => {
      // Разбиваем куки на пары ключ-значения, учитывая возможный символ '=' в значении
      const [key, ...rest] = cookie.trim().split('=');
      return [key, decodeURIComponent(rest.join('='))];
    }),
  );
};

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
export const validateToken = <T extends JwtPayload>(token: string, secret?: string): T | null => {
  if (!secret) {
    throw new GraphQLError('Secret is not defined');
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
  await Token.findOneAndUpdate({ userId }, { refreshToken }, { upsert: true, new: true });
};

//////////  токен //////////
export const getToken = async (refreshToken: string) => {
  return await Token.findOne({ refreshToken });
};

////////// Удаляем токен //////////
export const removeToken = async (refreshToken: string) => {
  await Token.deleteOne({ refreshToken });
};
