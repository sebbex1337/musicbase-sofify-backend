import mysql from "mysql2/promise";
import "dotenv/config";
import fs from "fs/promises";

const dbConnection = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
};

if (process.env.MYSQL_CERT) {
    dbConnection.ssl = { ca: await fs.readFile("DigiCertGlobalRootCA.crt.pem") };
}

const connection = await mysql.createConnection(dbConnection);

export default connection;
