import { userSchema } from '@/schema/user-schema';
import { GraphQLError } from 'graphql';

export const validateUser = async (email: string, password: string) => {
  const result = userSchema.safeParse({ email, password });

  if (!result.success) {
    const errorMessages = result.error.issues;
    throw new GraphQLError(errorMessages[0].message, { extensions: { code: 'BAD_USER_INPUT' } });
  }
};
