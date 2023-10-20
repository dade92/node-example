import express, {json} from "express";
import {CustomerRepository} from "./MongoDB.js";

export const app = express();
app.use(json());

let DB;

function initDB() {
    if (process.env.STAGE === 'local') {
        console.log('Running in local env');
        DB = 'localhost';
    } else {
        DB = 'mongo';
    }
}

initDB();

export const customerRepository = new CustomerRepository(DB, "27017");
