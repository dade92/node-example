import express, {json} from "express";
import {CustomerRepository} from "./MongoDB.js";

export const app = express();
app.use(json());

const initDBUrl = () => {
    if (process.env.STAGE === 'local') {
        console.log('Running in local env');
        return 'localhost';
    } else {
        return 'mongo';
    }
};

export const customerRepository = new CustomerRepository(initDBUrl(), "27017");
