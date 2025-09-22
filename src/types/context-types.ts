import { Request, Response } from 'express';

export type TGraphQLContextParams = {
  req: Request;
  res: Response;
};

export type TGraphQLContext = {
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  res: Response;
};
