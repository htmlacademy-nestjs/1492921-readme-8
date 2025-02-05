export const BearerAuthOption = {
  description: `[just text field] Please enter token in following format: Bearer `,
  name: 'Authorization',
  bearerFormat: 'Bearer',
  scheme: 'Bearer',
  type: 'http',
} as const;

export const BearerAuth = {
  AccessToken: 'accessToken',
  RefreshToken: 'refreshToken',
} as const;
