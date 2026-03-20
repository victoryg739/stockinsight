import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

type Env = {
  DATABASE_URL: string;
};

export default defineConfig({
  schema: 'schema.prisma',
  migrations: {
    path: 'migrations',
  },
  datasource: {
    url: env<Env>('DATABASE_URL'),
  },
});
