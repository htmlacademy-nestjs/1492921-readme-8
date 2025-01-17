export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  Blogs = 'http://localhost:3334/api/posts',
  Files = 'http://localhost:3335/api/files',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
