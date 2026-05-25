import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from the project root
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`[env] Missing required environment variable: "${key}"`);
  }
  return value;
}

export const ENV = {
  BASE_URL: requireEnv('BASE_URL', 'http://localhost:3000'),
  HEADLESS: requireEnv('HEADLESS', 'true') === 'true',
  RETRIES: parseInt(requireEnv('RETRIES', '0'), 10),
  TIMEOUT: parseInt(requireEnv('TIMEOUT', '30000'), 10),
  LOGIN_EMAIL: requireEnv('LOGIN_EMAIL', ''),
  LOGIN_PASSWORD: requireEnv('LOGIN_PASSWORD', ''),
} as const;
