import { validateToken } from '@/services/token-service';
import { TGraphQLContext, TGraphQLContextParams } from '@/types/context-types';
import { parse } from 'cookie';
import { GraphQLError } from 'graphql';

export const context = async ({ req, res }: TGraphQLContextParams): Promise<TGraphQLContext> => {
  const authorizationHeader = req.headers.authorization;
  const accessToken = authorizationHeader?.split(' ')[1];

  const { JWT_ACCESS_SECRET } = process.env;
  if (!JWT_ACCESS_SECRET) {
    throw new GraphQLError('No access token secret', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }

  const decoded = validateToken<{ userId: string }>(accessToken, JWT_ACCESS_SECRET);
  const userId = decoded?.userId;

  const parsedCookies = parse(req.headers.cookie || '');
  const refreshToken = parsedCookies['refresh-token'];

  return {
    userId,
    accessToken,
    refreshToken,
    res,
  };
};
