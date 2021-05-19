import { join } from "node:path";
import { createConnection, ConnectionOptions } from "typeorm";

const sslCertificate = process.env.NODE_ENV === "development" ?
    null :
    { rejectUnauthorized: false };

const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [__dirname + "/../models/**/*.{js,ts}"],
    migrations: [__dirname + "/../database/migrations/**/*.{js,ts}"],
    cli: {
        migrationsDir: './src/database/migration'
    },
    extra: {
        ssl: sslCertificate
    }
}

createConnection(config).then(async connection => {
    console.log('Connection Successful');
}).catch(error => {
    console.log(error);
});

