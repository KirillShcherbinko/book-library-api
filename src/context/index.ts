import { parseCookies, validateToken } from '@/services/token-service';
import { TGraphQLContext, TGraphQLContextParams } from '@/types/context-types';
import { GraphQLError } from 'graphql';

export const context = async ({ req, res }: TGraphQLContextParams): Promise<TGraphQLContext> => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    throw new GraphQLError('User unauthorized', { extensions: { code: 'UNAUTHORIZED' } });
  }

  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    throw new GraphQLError('No access token', { extensions: { code: 'UNAUTHORIZED' } });
  }

  const { JWT_ACCESS_SECRET } = process.env;
  if (!JWT_ACCESS_SECRET) {
    throw new GraphQLError('No access token secret', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }

  const decoded = validateToken<{ userId: string }>(accessToken, JWT_ACCESS_SECRET);
  if (!decoded) {
    throw new GraphQLError('Invalid access token', { extensions: { code: 'UNAUTHORIZED' } });
  }
  const userId = decoded.userId;

  const parsedCookies = parseCookies(req);
  const refreshToken = parsedCookies['refresh-token'];

  return {
    userId,
    accessToken,
    refreshToken,
    res,
  };
};
