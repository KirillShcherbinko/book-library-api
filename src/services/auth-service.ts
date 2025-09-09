import { User } from '@/model/User';
import { GraphQLError } from 'graphql';
import { compare, hashSync } from 'bcrypt';
import { generateTokens, getToken, removeToken, saveToken, validateToken } from './token-service';

////////// Логин //////////
export const login = async (email: string, password: string) => {
  const userData = await User.findOne({ email });
  if (!userData) {
    throw new GraphQLError('Invalid email', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  const isPasswordValid = await compare(password, userData.hashedPassword);
  if (!isPasswordValid) {
    throw new GraphQLError('Invalid password', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  const { accessToken, refreshToken } = generateTokens({ userId: userData.id });
  await saveToken(userData.id, refreshToken);

  return { userId: userData.id, accessToken, refreshToken };
};

////////// Регистрация //////////
export const register = async (email: string, password: string) => {
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new GraphQLError('User already exists', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  const hashedPassword = hashSync(password, 8);
  const { id } = await User.create({ email, hashedPassword });

  const { accessToken, refreshToken } = generateTokens({ userId: id });
  await saveToken(id, refreshToken);

  return { userId: id, accessToken, refreshToken };
};

////////// Выход //////////
export const logout = async (refreshToken: string) => {
  await removeToken(refreshToken);
};

////////// Обновление refresh токена //////////
export const refresh = async (refreshToken: string) => {
  const isRefreshTokenExists = await getToken(refreshToken);
  if (!isRefreshTokenExists) {
    throw new GraphQLError('No refresh token', { extensions: { code: 'UNAUTHORIZED' } });
  }

  const { JWT_REFRESH_SECRET } = process.env;
  const decoded = validateToken<{ userId: string }>(refreshToken, JWT_REFRESH_SECRET);
  if (!decoded) {
    throw new GraphQLError('Invalid refresh token or secret', {
      extensions: { code: 'UNAUTHORIZED' },
    });
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: decoded.userId });
  await saveToken(decoded.userId, newRefreshToken);

  return { userId: decoded.userId, accessToken, newRefreshToken };
};
