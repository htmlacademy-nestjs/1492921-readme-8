import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DefaultPort = {
  Listen: 3000,
  Mongo: 27017,
};
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface FileVaultConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
  serveDirectory: string;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DefaultPort.Listen),
  uploadDirectory: Joi.string().required(),
  serveDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
});

function validateConfig(config: FileVaultConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[FileVault Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): FileVaultConfig {
  const config: FileVaultConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DefaultPort.Listen}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    serveDirectory: process.env.SERVE_ROOT,
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
  };

  validateConfig(config);
  return config;
}

export const fileVaultConfig = registerAs('application', getConfig);
