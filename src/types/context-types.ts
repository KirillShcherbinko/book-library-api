import type { IncomingMessage, ServerResponse } from 'http';

export type TGraphQLContextParams = {
  req: IncomingMessage;
  res: ServerResponse;
};

export type TGraphQLContext = {
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  res: ServerResponse;
};
