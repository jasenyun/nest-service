import { env } from '../utils/env';

interface AppConfig {
  name: string;
  port: number;
}

export const app: AppConfig = {
  name: env('app.name'),
  port: env('app.port'),
};
