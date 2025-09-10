import { context } from './../context/index';
import { TGraphQLContext } from '@/types/context-types';
import { serialize } from 'cookie';

const MAX_AGE = 10 * 60;

const cookieOptions = (age: number) => {
  return { httpOnly: true, maxAge: age, secure: process.env.NODE_ENV === 'production' };
};

export const setCookies = (key: string, value: string, context: TGraphQLContext) => {
  const { res } = context;
  res.setHeader('Set-Cookie', serialize(key, value, cookieOptions(MAX_AGE)));
};

export const clearCookies = (key: string, context: TGraphQLContext) => {
  const { res } = context;
  res.setHeader('Set-Cookie', serialize(key, '', cookieOptions(0)));
};
