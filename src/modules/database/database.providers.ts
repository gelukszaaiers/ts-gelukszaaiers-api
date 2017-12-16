import { createConnection } from "typeorm";
import * as config from "config";

export const databaseProviders = [
  {
    provide: "DbConnectionToken",
    useFactory: async () => {
      const dbConfig = JSON.parse(JSON.stringify(config.get('database')));
      if (dbConfig.url) return await createConnection({
        url: dbConfig.database.url,
        type: dbConfig.database.type,
        entities: [
          __dirname + '/../../entity/**/*.ts'
        ],
        synchronize: dbConfig.synchronize,
        logging: dbConfig.logging,
      });

      return await createConnection({
        type: dbConfig.type,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.name,
        entities: [
          __dirname + '/../../entity/**/*.ts'
        ],
        synchronize: dbConfig.synchronize,
        logging: dbConfig.logging,
      });
    },
  },
];
