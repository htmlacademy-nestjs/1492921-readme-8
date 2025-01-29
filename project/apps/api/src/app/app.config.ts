export const API_PORT = 3000;

export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  Blogs = 'http://localhost:3334/api/posts',
  Files = 'http://localhost:3335/api/files',
}

export const HttpClientConfig = {
  MaxRedirects: 5,
  Timeout: 3000,
} as const;
