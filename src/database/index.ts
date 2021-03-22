import { createConnection, ConnectionOptions } from "typeorm";

const rootDir = process.env.NODE_ENV === "development" ?
    "./src" :
    "./build";

const extensionDir = process.env.NODE_ENV === "development" ?
    ".ts" :
    ".js";

const sslCertificate = process.env.NODE_ENV === "development" ?
    null :
    { rejectUnauthorized: false };

const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: 'all',
    synchronize: true,
    entities: [rootDir + "/models/**" + extensionDir],
    migrations: [rootDir + "/database/migrations/**" + extensionDir],
    cli: {
        migrationsDir: './src/database/migrations'
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

