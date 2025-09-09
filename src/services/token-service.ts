import { GraphQLError } from 'graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IncomingMessage } from 'http';

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

export const validateToken = <T extends JwtPayload>(token: string, secret: string): T | null => {
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
