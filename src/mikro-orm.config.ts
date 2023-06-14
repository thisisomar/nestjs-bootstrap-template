export default {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'nestjs_bootstrap_template',
  type: 'postgresql',
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: parseInt('5432', 10),
  debug: process.env.NODE_ENV !== 'production',
  seeder: {
    path: 'dist/src/database/',
    pathTs: 'src/database/',
    glob: '!(*.d).{js,ts}',
  },
};
        