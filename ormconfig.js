let rootDir = process.env.NODE_ENV === "development" ?
    "src" :
    "build";

let extensionDir = process.env.NODE_ENV === "development" ?
    ".ts" :
    ".js";

module.exports = {
    "type": process.env.TYPE_CONNECTION,
    "host": process.env.TYPE_HOST,
    "port": process.env.TYPE_PORT,
    "username": process.env.TYPE_USERNAME,
    "password": process.env.TYPE_PASSWORD,
    "database": process.env.TYPE_DATABASE,
    "logging": process.env.TYPE_LOGGING,
    "synchronize": process.env.TYPE_SYNCHRONIZE,

    "entities": [rootDir + "/models/**" + extensionDir],
    "migrations": [rootDir + "/database/migrations/**" + extensionDir],
    "subscribers": [rootDir + "/database/subscribers/**" + extensionDir],
    "seeds": [rootDir + "/database/migrations/seeds/**" + extensionDir],
    "factories": [rootDir + "/database/migrations/factories/**" + extensionDir],
}