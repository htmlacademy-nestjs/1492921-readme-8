export const AuthUserError = {
  EmailExists: 'User with this email exists',
  LoginExists: 'User with this login exists',
  UserNotFound: 'User not found',
  PasswordWrong: 'User password is wrong',
} as const;

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;
