import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DefaultPort = {
  Listen: 3002,
  Mongo: 27017,
  Rabbit: 27017,
  Smtp: 25,
};

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  };
  rabbit: {
    host: string;
    password: string;
    user: string;
    queueSubscriber: string;
    queuePostUpdates: string;
    exchange: string;
    port: number;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DefaultPort.Listen),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DefaultPort.Rabbit),
    user: Joi.string().required(),
    queueSubscriber: Joi.string().required(),
    queuePostUpdates: Joi.string().required(),
    exchange: Joi.string().required(),
  }),
  mail: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DefaultPort.Smtp),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required(),
  }),
});

function validateConfig(config: NotifyConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Notify Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DefaultPort.Listen}`, 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(
        process.env.MONGO_PORT ?? DefaultPort.Mongo.toString(),
        10
      ),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(
        process.env.RABBIT_PORT ?? DefaultPort.Rabbit.toString(),
        10
      ),
      user: process.env.RABBIT_USER,
      queueSubscriber: process.env.RABBIT_QUEUE_SUBSCRIBERS,
      queuePostUpdates: process.env.RABBIT_QUEUE_POST_UPDATES,
      exchange: process.env.RABBIT_EXCHANGE,
    },
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(
        process.env.MAIL_SMTP_PORT ?? DefaultPort.Smtp.toString(),
        10
      ),
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    },
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
