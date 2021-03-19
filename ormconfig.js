let rootDir = process.env.NODE_ENV === "development" ?
    "src" :
    "build";

let extensionDir = process.env.NODE_ENV === "development" ?
    ".ts" :
    ".js";

module.exports = {
    "type": process.env.TYPE_CONNECTION,
    "url": "postgres://afxtwmsovdmvxl:4b83ba25d2c9cd19eb20e8c31a4a4f75b6b791e4a817dd8f11143e0f5d2ad8f2@ec2-52-7-115-250.compute-1.amazonaws.com:5432/d3g287tr1brkgd",
    // "host": process.env.TYPE_HOST,
    // "port": process.env.TYPE_PORT,
    // "username": process.env.TYPE_USERNAME,
    // "password": process.env.TYPE_PASSWORD,
    // "database": process.env.TYPE_DATABASE,
    "logging": process.env.TYPE_LOGGING,
    "synchronize": process.env.TYPE_SYNCHRONIZE,

    "entities": [rootDir + "/models/**" + extensionDir],
    "migrations": [rootDir + "/database/migrations/**" + extensionDir],
    "subscribers": [rootDir + "/database/subscribers/**" + extensionDir],
    "seeds": [rootDir + "/database/migrations/seeds/**" + extensionDir],
    "factories": [rootDir + "/database/migrations/factories/**" + extensionDir],
}