import { TGraphQLContext } from '@/types/context-types';
import { GraphQLError } from 'graphql';

export const authUser = (context: TGraphQLContext) => {
  const { userId, accessToken } = context;
  if (!userId || !accessToken) {
    throw new GraphQLError('User unautorized', { extensions: { code: 'UNAUTHORIZED' } });
  }

  return userId;
};
