import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const ENV_CONFIG = {
  qa: {
    UI_BASE_URL: 'https://www.saucedemo.com',
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    SAUCE_USERNAME: 'standard_user',
  },
  staging: {
    UI_BASE_URL: 'https://www.saucedemo.com',
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    SAUCE_USERNAME: 'performance_glitch_user',
  },
} as const;

type EnvName = keyof typeof ENV_CONFIG;

function resolveEnvironment(envName: string | undefined): EnvName {
  if (!envName) {
    return 'qa';
  }

  if (envName in ENV_CONFIG) {
    return envName as EnvName;
  }

  throw new Error(
    `Unsupported TEST_ENV value: ${envName}. Allowed values: ${Object.keys(ENV_CONFIG).join(', ')}`,
  );
}

export const currentEnv = resolveEnvironment(process.env.TEST_ENV);
export const config = ENV_CONFIG[currentEnv];

function requireEnv(name: 'SAUCE_USERNAME' | 'SAUCE_PASSWORD'): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const AUTH_CONFIG = {
  SAUCE_USERNAME: requireEnv('SAUCE_USERNAME'),
  SAUCE_PASSWORD: requireEnv('SAUCE_PASSWORD'),
} as const;
