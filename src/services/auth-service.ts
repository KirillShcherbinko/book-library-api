import { User } from '@/model/User';
import { GraphQLError } from 'graphql';
import { compare } from 'bcrypt';
import { generateTokens, saveToken } from './token-service';

export const login = async (email: string, password: string) => {
  const userData = await User.findOne({ email });
  if (!userData) {
    throw new GraphQLError('Invalid email', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  const isPasswordValid = await compare(password, userData.hashedPassword);
  if (!isPasswordValid) {
    throw new GraphQLError('Invalid password', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  const { accessToken, refreshToken } = generateTokens(userData.id);
  await saveToken(userData.id, refreshToken);

  return { userId: userData.id, accessToken, refreshToken };
};
