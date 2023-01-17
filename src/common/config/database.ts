import { env } from 'src/common/utils/env';

export interface DatabaseConfig {
  type: string;
  database: string;
  url: string;
  synchronize: boolean;
}

export const database: DatabaseConfig = {
  type: env('database.type', 'mysql'),
  database: env('database.database', './database.mysql'),
  url: env('database.url', ''),
  synchronize: env('database.synchronize', false),
};
