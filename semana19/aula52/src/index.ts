import express, { Express } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import createUser from "./endpoints/createUser";
import getUserByEmail from "./endpoints/getUserByEmail";
import getUserById from "./endpoints/getUserById";
import deleteUser from "./endpoints/deleteUser";
import getUser from "./endpoints/getUser";
import getAddressInfo from "./endpoints/getAddressInfo";


dotenv.config();

export const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
  },
});

const app: Express = express();
app.use(express.json());
app.use(cors());



//criar usuário
app.post('/signup', createUser)
app.post("/login", getUserByEmail)
app.get("/user/profile", getUserById)
app.delete("/user/:id", deleteUser)
app.get("/user", getUser)

//pegar cep de outro servidor
app.get('/address/:cep', getAddressInfo)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

console.log("create the project tables with the command 'npm run createTables'")