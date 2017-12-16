import { createConnection } from "typeorm";

export const databaseProviders = [
  {
    provide: "DbConnectionToken",
    useFactory: async () => await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "developer",
      password: "developer",
      database: "dev",
      entities: [
        __dirname + '/../../entity/**/*.ts'
      ],
      synchronize: true,
      logging: false,
    }),
  },
];
