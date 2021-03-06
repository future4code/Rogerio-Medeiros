import express, { Express } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { recipe } from "./types/recipe";
import createTableUsers from "./data/queryEndPoint/createTableUsers";
import { getUserName } from "./data/endpoints/getUserName";
import { getUserType } from "./data/endpoints/getUserType";
import { orderTypeName } from "./data/endpoints/orderTypeName";
import { getAllUsersLimit } from "./data/endpoints/getAllUsersLimit";
import { getAllUsers } from "./data/endpoints/getAllUsers ";

dotenv.config();

export const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get("/user", getAllUsers)
app.get("/user/:page", getAllUsersLimit)
app.get("/user/search", getUserName);
app.get("/user/:type", getUserType);
app.put("/user/order", orderTypeName);


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
