import { TGraphQLContext } from '@/types/context-types';
import { serialize, SerializeOptions } from 'cookie';

const MAX_AGE = 10 * 60;

const cookieOptions = (age: number): SerializeOptions => {
  return {
    httpOnly: true,
    maxAge: age,
    secure: true,
    sameSite: 'none',
  };
};

export const setCookies = (key: string, value: string, context: TGraphQLContext) => {
  const { res } = context;
  res.setHeader('Set-Cookie', serialize(key, value, cookieOptions(MAX_AGE)));
};

export const clearCookies = (key: string, context: TGraphQLContext) => {
  const { res } = context;
  res.setHeader('Set-Cookie', serialize(key, '', cookieOptions(0)));
};
