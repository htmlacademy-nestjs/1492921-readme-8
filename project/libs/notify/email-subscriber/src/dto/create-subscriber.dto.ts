import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriberRequestErrors } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberRequestErrors.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: SubscriberRequestErrors.NameIsEmpty })
  public name: string;
}
